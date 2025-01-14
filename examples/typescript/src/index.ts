import { cms } from '@tensei/cms'
import { rest } from '@tensei/rest'
import { auth } from '@tensei/auth'
import { graphql } from '@tensei/graphql'
import { files, media } from '@tensei/media'

import {
  tensei,
  welcome,
  cors,
  resource,
  text,
  textarea,
  integer,
  slug,
  belongsTo,
  belongsToMany,
  select,
  boolean,
  dateTime,
  json,
  hasMany
} from '@tensei/core'

export default tensei()
  .resources([
    resource('Product')
      .fields([
        text('Name').rules('required').sortable().searchable(),
        slug('Slug')
          .creationRules('required', 'unique:slug')
          .unique()
          .description(
            'A short name representing the product name. Used for uniquely displaying the product in the browser.'
          )
          .from('Name')
          .searchable(),
        select('Shipping Scope')
          .options(['Worldwide', 'Nationwide', 'Lagos Only'])
          .default('Lagos Only'),
        dateTime('Date Issued').nullable(),
        textarea('Description').creationRules('required', 'max:255'),
        integer('Price').required().sortable(),
        json('Metadata').nullable().required(),
        belongsToMany('Category'),
        belongsToMany('Product Option'),
        belongsToMany('Order Item'),
        belongsToMany('Collection'),
        hasMany('Review'),
        files('Image')
      ])
      .displayField('Name'),
    resource('Category')
      .fields([
        text('Name').notNullable().required(),
        slug('Slug')
          .creationRules('required', 'unique:slug')
          .unique()
          .from('Name'),
        textarea('Description').nullable(),
        belongsToMany('Product')
      ])
      .displayField('Name'),
    resource('Collection')
      .fields([
        text('Name').notNullable().required(),
        slug('Slug')
          .creationRules('required', 'unique:slug')
          .unique()
          .from('Name'),
        textarea('Description').nullable(),
        belongsToMany('Product')
      ])
      .displayField('Name'),
    resource('Review')
      .fields([
        text('Headline').required(),
        belongsTo('Customer').nullable(),
        text('Name').nullable(),
        text('Email').nullable(),
        textarea('Content').required(),
        integer('Rating').required().min(0).max(5),
        boolean('Approved').default(false).hideOnCreate().hideOnCreateApi(),
        belongsTo('Product')
      ]),
    resource('Order')
      .fields([
        integer('Total').required(),
        belongsTo('Customer'),
        text('Stripe Checkout ID').hideOnIndex(),
        belongsToMany('Product')
      ]),
    resource('Order Item')
      .fields([
        integer('Quantity').required(),
        integer('Total').required(),
        belongsTo('Order').required(),
        belongsTo('Product').required()
      ]),
    resource('Option')
      .fields([
        text('Name').required(),
        slug('Short name')
          .creationRules('required', 'unique:slug')
          .unique()
          .from('Name')
      ])
      .hideFromNavigation(),
    resource('Option Value')
      .fields([
        text('Name').required(),
        slug('Short name')
          .creationRules('required', 'unique:slug')
          .unique()
          .from('Name'),
        belongsToMany('Option')
      ])
      .hideFromNavigation(),
    resource('Product Option')
      .fields([
        belongsToMany('Option'),
        belongsToMany('Option Value'),
        belongsToMany('Product'),
        files('Image')
      ])
      .hideFromNavigation()
  ])
  .plugins([
    welcome(),
    cms().plugin(),
    media().plugin(),
    auth()
      .user('Customer')
      .configureTokens({
        accessTokenExpiresIn: 60 * 60 * 60 * 60 * 60
      })
      .verifyEmails()
      .plugin(),
    rest().plugin(),
    graphql().plugin(),
    cors()
  ])
  .db({
    type: 'sqlite',
    dbName: 'db.sqlite'
  })
  .boot(async ({ repositories }) => {
    // await seed(repositories)
    console.log('App running on http://localhost:8810')
  })
  .start()
  .catch(console.error)
