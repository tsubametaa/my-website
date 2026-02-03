import { Language } from "./switch-lang";
import en from "./translate/en.json";
import id from "./translate/id.json";
import ms from "./translate/my.json";
import jp from "./translate/jp.json";
import ch from "./translate/ch.json";

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en,
  id,
  ms,
  jp,
  ch,
};
