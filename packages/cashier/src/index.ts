import Plan from './Plan'
import {
    tool,
    resource,
    text,
    integer,
    timestamp,
    belongsTo,
} from '@tensei/common'

interface CashierConfig {
    customerResourceName: string
    plans: Plan[]
    stripeKey: string
    cardUpfront: boolean
}

class Cashier {
    private config: CashierConfig = {
        plans: [],
        cardUpfront: false,
        customerResourceName: '',
        stripeKey: process.env.STRIPE_KEY || '',
    }

    public customerResourceName(name: string) {
        this.config.customerResourceName = name

        return this
    }

    private subscriptionsResource() {
        return resource('Subscription')
            .hideFromNavigation()
            .fields([
                text('Name').rules('required'),
                text('Stripe Id').rules('required'),
                text('Stripe Plan').rules('required'),
                text('Stripe Status').rules('required'),
                integer('Quantity').default('0'),
                timestamp('Trial Ends At'),
                timestamp('Ends At'),
                belongsTo(this.config.customerResourceName),
            ])
    }

    private invoicesResource() {
        return resource('Invoice').hideFromNavigation().fields([])
    }

    public plans(plans: Plan[]) {
        this.config.plans = plans

        return this
    }

    public stripeKey(key: string) {
        this.config.stripeKey = key

        return this
    }

    public cardUpfront() {
        this.config.cardUpfront = true

        return this
    }

    public tool() {
        return tool('Cashier')
            .beforeDatabaseSetup(({ pushResource }) => {
                pushResource(this.subscriptionsResource())

                return Promise.resolve()
            })
            .setup(({ resources }) => {
                const customerResource = resources.find(
                    (resource) =>
                        resource.data.name === this.config.customerResourceName
                )

                if (!customerResource) {
                    throw new Error(`The customer resource must be provided.`)
                }

                return Promise.resolve()
            })
    }
}

export const cashier = () => new Cashier()

export const plan = (name: string, slug?: string) => new Plan(name, slug)
