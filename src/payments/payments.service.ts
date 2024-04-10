import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { TenantService } from '../tenants/tenants.service';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private readonly tenantService: TenantService,
  ) {
    this.stripe = new Stripe(
      this.configService.getOrThrow('stripe.apiKey', { infer: true }),
      {
        apiVersion: '2023-10-16',
      },
    );
  }

  async createCheckoutSession(
    line_items: any[],
    tenantId: string,
    userId: string,
  ) {
    if (!tenantId || !userId) {
      throw new Error('Missing required metadata');
    }

    const tenant = await this.tenantService.findOne({
      id: tenantId,
    });

    if (!tenant) {
      throw new Error(`Tenant with id ${tenantId} not found`);
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      /*line_items: line_items?.map((item) => ({
        price: item?.price,
        quantity: item?.quantity,
      })),*/
      // customer: tenant.stripeCustomerId ? tenant.stripeCustomerId : undefined,
      /*customer_update: tenant.stripeCustomerId
        ? {
            name: 'auto',
          }
        : undefined,*/
      client_reference_id: tenantId,
      metadata: {
        // Any metadata you want
      },
      tax_id_collection: {
        enabled: true,
      },
      mode: 'subscription',
      success_url: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })}/billing/success`,
      cancel_url: this.configService.get('app.frontendDomain', { infer: true }),
    });

    return session.url;
  }

  async updateTenantSubscription(session: Stripe.Checkout.Session) {
    const tenantId = session.metadata?.tenantId;
    const subscriptionPlan = session.metadata?.plan;
    const customerId = session.customer;

    if (!tenantId || !subscriptionPlan || !customerId) {
      throw new Error('Missing required metadata');
    }

    await this.tenantService.updateTenantSubscription({
      tenantId,
      subscriptionType: 'stripe',
      stripeCustomerId: customerId,
      subscriptionId: session.subscription,
    });
  }

  async getInvoices(tenantId: string, cursor?: string) {
    const tenant = await this.tenantService.findOne({
      id: tenantId,
    });

    if (!tenant) {
      throw new Error(`Tenant with id ${tenantId} not found`);
    }

    if (!tenant.stripeCustomerId) {
      throw new Error(
        `Tenant with id ${tenantId} does not have a Stripe customer ID`,
      );
    }

    if (cursor) {
      return this.stripe.invoices.search({
        query: `customer:${tenant.stripeCustomerId}`,
        limit: 10,
        page: cursor,
      });
    } else {
      return this.stripe.invoices.search({
        query: `customer:${tenant.stripeCustomerId}`,
        limit: 10,
      });
    }
  }
}
