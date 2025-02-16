import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.test_env}`,
  override: true,
});

export default class ENV {
  public static BASE_URL = process.env.BASE_URL;
  public static BASE_API_URL = process.env.BASE_API_URL;
  public static CLIENT_ID = process.env.CLIENT_ID;
  public static CLIENT_SECRET = process.env.CLIENT_SECRET;
  public static CLIENT_TOKEN = process.env.CLIENT_TOKEN;
}
