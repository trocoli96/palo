import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import Handlebars from 'handlebars';
import { AllConfigType } from 'src/config/config.type';
import { Resend } from 'resend';
import { ResendOptions } from './types/mail';

@Injectable()
export class MailerService {
  private readonly transporter: Resend;
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.transporter = new Resend(
      configService.get('mail.resendKey', { infer: true }),
    );
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: ResendOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    try {
      const resendOptions = {
        to: mailOptions.to,
        subject: mailOptions.subject || '',
        from: mailOptions.from
          ? mailOptions.from
          : `"${this.configService.get('mail.defaultName', {
              infer: true,
            })}" <${this.configService.get('mail.defaultEmail', {
              infer: true,
            })}>`,
        html: mailOptions.html ? mailOptions.html : html,
        react: null,
      };
      await this.transporter.emails.send(resendOptions);
    } catch (e) {
      console.error(e);
    }
  }
}
