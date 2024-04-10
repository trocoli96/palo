import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import Stripe from 'stripe';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/guards/public.decorator';

@ApiTags('payments')
@Controller({
  path: 'payments',
  version: '1',
})
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-checkout-session')
  async createSession(
    @Body() line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
    @Request() req: any,
  ) {
    const tenantId = req.user.tenantId;
    const userId = req.user.id;
    const sessionUrl = await this.paymentsService.createCheckoutSession(
      line_items,
      tenantId,
      userId,
    );
    return { sessionUrl };
  }

  @Get('/invoices')
  @HttpCode(200)
  async getInvoices(@Request() req: any, @Query('cursor') cursor: string) {
    return this.paymentsService.getInvoices(req.user.tenantId, cursor);
  }

  @Post('/webhook')
  @HttpCode(200)
  @Public()
  async readWebhook(@Body() requestBody: Stripe.Event) {
    if (requestBody.type === 'checkout.session.completed') {
      await this.paymentsService.updateTenantSubscription(
        requestBody.data.object,
      );
    }
    return;
  }
}
