import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.test_env}`,
  override: true,
});

export default class ENV {
  public static readonly BASE_URL = process.env.BASE_URL;
  public static readonly BASE_API_URL = process.env.BASE_API_URL;
  public static readonly CLIENT_ID = process.env.CLIENT_ID;
  public static readonly CLIENT_SECRET = process.env.CLIENT_SECRET;
  public static readonly CLIENT_TOKEN = process.env.CLIENT_TOKEN;
}
