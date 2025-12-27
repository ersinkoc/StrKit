/**
 * Locales Registry
 * Provides locale data for i18n support
 */

import { localeManager } from '../core/locale.js';
import { en } from './en.js';
import { tr } from './tr.js';
import { de } from './de.js';
import { fr } from './fr.js';
import { es } from './es.js';
import { pt } from './pt.js';
import { it } from './it.js';
import { nl } from './nl.js';
import { pl } from './pl.js';
import { ru } from './ru.js';
import { ar } from './ar.js';
import { zh } from './zh.js';
import { ja } from './ja.js';
import { ko } from './ko.js';

// Register all locales
localeManager.register(en);
localeManager.register(tr);
localeManager.register(de);
localeManager.register(fr);
localeManager.register(es);
localeManager.register(pt);
localeManager.register(it);
localeManager.register(nl);
localeManager.register(pl);
localeManager.register(ru);
localeManager.register(ar);
localeManager.register(zh);
localeManager.register(ja);
localeManager.register(ko);

// Export all locales
export { en, tr, de, fr, es, pt, it, nl, pl, ru, ar, zh, ja, ko };
