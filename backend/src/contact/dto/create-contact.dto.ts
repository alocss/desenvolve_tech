import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @IsEmail()
  @MaxLength(200)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  message: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  company?: string;

  /**
   * Campo honeypot: invisível para humanos, bots costumam preenchê-lo.
   * Se vier preenchido, o lead é descartado silenciosamente (ver ContactService).
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}
