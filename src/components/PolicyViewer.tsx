import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  Trash2,
  Copy,
  Check,
  Printer,
  ArrowLeft,
  ExternalLink,
  Mail,
  AlertCircle,
  Lock,
  Smartphone,
} from 'lucide-react';
import { ActivePage } from '../types';
import { APP_CONFIG } from '../data/content';

interface PolicyViewerProps {
  initialPage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export default function PolicyViewer({ initialPage, setActivePage }: PolicyViewerProps) {
  const [selectedDoc, setSelectedDoc] = useState<'privacy' | 'terms' | 'data-deletion'>(
    initialPage === 'home' ? 'privacy' : (initialPage as 'privacy' | 'terms' | 'data-deletion')
  );
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(`${window.location.origin}${window.location.pathname}#${selectedDoc}`);
    }
  }, [selectedDoc]);

  const copyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="policy-viewer-container" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            id="back-to-home-btn"
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to App Showcase</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={copyUrl}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied URL!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Clean Transparency Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-100/90 border border-slate-200 flex items-start gap-3 text-xs text-slate-700">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block text-sm text-slate-900 mb-0.5">
              Official Privacy & Legal Disclosures
            </span>
            <p className="leading-relaxed text-slate-600">
              Clear, transparent documentation detailing how Expense Manager handles your data with an offline-first, local-only architecture.
            </p>
          </div>
        </div>

        {/* Document Switcher Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl mb-8 overflow-x-auto">
          <button
            id="tab-privacy-policy"
            onClick={() => setSelectedDoc('privacy')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              selectedDoc === 'privacy'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>
          <button
            id="tab-terms-of-service"
            onClick={() => setSelectedDoc('terms')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              selectedDoc === 'terms'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>
          <button
            id="tab-data-deletion"
            onClick={() => setSelectedDoc('data-deletion')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              selectedDoc === 'data-deletion'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Data Deletion & Safety</span>
          </button>
        </div>

        {/* Policy Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-200 leading-relaxed text-slate-700 text-sm">
          {/* PRIVACY POLICY */}
          {selectedDoc === 'privacy' && (
            <article className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                  Official Legal Document
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                  Privacy Policy for Expense Manager
                </h1>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                  <span>Effective Date: {APP_CONFIG.privacyEffectiveDate}</span>
                  <span>•</span>
                  <span>Last Updated: {APP_CONFIG.lastUpdatedDate}</span>
                  <span>•</span>
                  <span>Developer: {APP_CONFIG.developerName}</span>
                </div>
              </div>

              {/* Summary Highlights */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Key Privacy Commitments (Summary):
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                  <li><strong>100% Local Storage:</strong> All financial entries, budgets, and notes are stored strictly on your device.</li>
                  <li><strong>Zero Cloud Syncing:</strong> We operate no external databases or servers that collect your personal records.</li>
                  <li><strong>No Banking Credentials:</strong> We do not ask for or connect to your bank accounts, credit cards, or passwords.</li>
                  <li><strong>No Third-Party Ad Networks or Profiling:</strong> We do not track you across apps or sell your data.</li>
                </ul>
              </div>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">1. Introduction</h2>
                <p>
                  This Privacy Policy governs your use of the mobile application <strong>Expense Manager</strong> (&quot;Application&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), created by developer <strong>{APP_CONFIG.developerName}</strong>. The Application is available through the Google Play Store and verified official distribution channels.
                </p>
                <p>
                  We are committed to protecting your privacy. This policy explains our practices regarding the collection, storage, and handling of information when you use our Application on Android devices.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">2. Information We Do NOT Collect</h2>
                <p>
                  Expense Manager is designed from the ground up to be an <strong>offline-first, privacy-centric utility</strong>. Unlike cloud-based personal finance tools:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>We <strong>do not</strong> require user registration, email addresses, phone numbers, or account creation.</li>
                  <li>We <strong>do not</strong> request, access, or store your bank account numbers, credit card details, net banking credentials, or SMS OTPs.</li>
                  <li>We <strong>do not</strong> collect precise GPS geolocation information.</li>
                  <li>We <strong>do not</strong> collect biometric data or personal identifying documents.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">3. Information Processed Locally on Your Device</h2>
                <p>
                  When you use the Application to record your personal finances, the following information is stored directly on your Android device&apos;s internal storage:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li><strong>Transaction Records:</strong> Expense and income amounts, transaction dates, selected categories (e.g., Food, Travel, Rent), payment modes (Cash, Card, UPI), and optional notes entered by you.</li>
                  <li><strong>Budget Configurations:</strong> Custom monthly spending limits, thresholds, and category budgets.</li>
                  <li><strong>App Preferences:</strong> Selected currency symbol, theme preferences (Dark/Light mode), and category sorting.</li>
                </ul>
                <p className="text-xs bg-slate-100 p-3 rounded-xl text-slate-600 border border-slate-200">
                  <strong>Important:</strong> All of the above data resides exclusively in the Application&apos;s private sandbox storage on your device (SQLite/Room Database). It is never transmitted to us or any external servers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">4. Android Device Permissions</h2>
                <p>The Application may request the following device permissions solely to support core user-invoked features:</p>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <span className="font-bold text-slate-900 block">Storage / Media Access (WRITE_EXTERNAL_STORAGE / Scoped Storage)</span>
                    <span className="text-xs text-slate-600">
                      <strong>Purpose:</strong> Only used when you explicitly trigger the &quot;Export to CSV&quot; or &quot;Backup Database&quot; function to save your spreadsheet file into your device&apos;s Downloads or Documents folder.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-white">
                    <span className="font-bold text-slate-900 block">Notifications (POST_NOTIFICATIONS)</span>
                    <span className="text-xs text-slate-600">
                      <strong>Purpose:</strong> (Optional) Used to deliver scheduled daily logging reminders or budget alert warnings configured by you in Settings. No promotional push notifications are ever sent.
                    </span>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">5. Third-Party Services & Google Play Services</h2>
                <p>
                  The Application is distributed via the Google Play Store. Google Play may automatically collect standard diagnostic, crash, and installation telemetry according to Google&apos;s standard policies:
                </p>
                <p>
                  For more details on Google Play Services data collection, visit <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">Google Privacy Policy</a>.
                </p>
                <p>
                  We do <strong>not</strong> integrate third-party advertising SDKs (such as AdMob, Meta Audience Network, or Unity Ads) and do <strong>not</strong> sell, rent, or trade your data to data brokers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">6. Data Retention and Deletion</h2>
                <p>
                  Because all transaction data is stored locally on your device, you maintain 100% control over retention:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li><strong>Instant In-App Deletion:</strong> You can wipe all transaction and budget records instantly using the in-app &quot;Reset Database&quot; button.</li>
                  <li><strong>Device Storage Clear:</strong> Navigating to Android <em>Settings &gt; Apps &gt; Expense Manager &gt; Storage &gt; Clear Storage</em> permanently deletes all records.</li>
                  <li><strong>App Uninstall:</strong> Uninstalling the Application automatically removes the local database and all associated records from your device.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">7. Children&apos;s Privacy (COPPA Compliance)</h2>
                <p>
                  Our Application does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. Since no personal data is collected or transmitted to our servers, our Application is fully compliant with COPPA and global child privacy regulations.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">8. Security of Your Data</h2>
                <p>
                  We value your trust in managing your expenses with our Application. Because data does not leave your device, your financial records cannot be breached in remote cloud database compromises. To ensure maximum safety, we recommend keeping your Android OS updated and utilizing device-level screen locks (PIN, Fingerprint, or Pattern).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">9. Changes to this Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. Any changes will be published directly on this website and reflected with an updated &quot;Effective Date&quot; at the top of this document. We advise you to review this page periodically for any changes.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">10. Contact Us</h2>
                <p>
                  If you have any questions, suggestions, or concerns regarding this Privacy Policy or the Application, please feel free to reach out to the developer directly:
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-900">Developer: {APP_CONFIG.developerName}</div>
                  <div>
                    Email:{' '}
                    <a
                      href={`mailto:${APP_CONFIG.developerEmail}`}
                      className="text-emerald-600 font-bold hover:underline"
                    >
                      {APP_CONFIG.developerEmail}
                    </a>
                  </div>
                </div>
              </section>
            </article>
          )}

          {/* TERMS OF SERVICE */}
          {selectedDoc === 'terms' && (
            <article className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                  Legal Agreement
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                  Terms of Service
                </h1>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                  <span>Last Updated: {APP_CONFIG.lastUpdatedDate}</span>
                  <span>•</span>
                  <span>Version: {APP_CONFIG.version}</span>
                </div>
              </div>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
                <p>
                  By downloading, installing, accessing, or using the <strong>Expense Manager</strong> mobile application, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not install or use the Application.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">2. Software License & Usage</h2>
                <p>
                  Expense Manager is software provided under standard open-source licensing terms. You are granted a revocable, non-exclusive, non-transferable, limited license to download, install, and use the Application strictly in accordance with the terms of this agreement.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">3. Disclaimer: No Financial or Tax Advice</h2>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Important Financial Disclaimer</span>
                  </div>
                  <p>
                    Expense Manager is a self-directed personal budgeting and tracking utility. <strong>It does not provide certified financial, accounting, investment, or tax advice.</strong> Calculations, reports, and charts generated by the Application are based exclusively on manual inputs provided by the user and are intended solely for general informational purposes.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">4. User Responsibility for Backups</h2>
                <p>
                  Because Expense Manager stores all records locally on your device without automated remote cloud syncing, you are solely responsible for exporting CSV backups and preserving your device files. The developer is not liable for data loss arising from device damage, system wipes, lost phones, or accidental uninstalls.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall the developer ({APP_CONFIG.developerName}) be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or personal goodwill, arising from your use of or inability to use the Application.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">6. Modifications to Application & Terms</h2>
                <p>
                  We reserve the right to modify, suspend, or discontinue the Application or any service to which it connects, with or without notice. We may also revise these Terms of Service at any time. Continued use of the Application after revisions constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">7. Contact Information</h2>
                <p>For questions or notices regarding these terms, please contact: <a href={`mailto:${APP_CONFIG.developerEmail}`} className="text-emerald-600 font-bold hover:underline">{APP_CONFIG.developerEmail}</a>.</p>
              </section>
            </article>
          )}

          {/* DATA DELETION & SAFETY */}
          {selectedDoc === 'data-deletion' && (
            <article className="space-y-8 animate-fadeIn">
              <div className="border-b border-slate-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded">
                  Google Play Data Safety Requirement
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                  Data Deletion & Safety Instructions
                </h1>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-2">
                  <span>Google Play Compliance URL</span>
                  <span>•</span>
                  <span>App: {APP_CONFIG.name}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Google Play Data Deletion Policy Overview</span>
                </div>
                <p>
                  Google Play requires developers to provide a clear pathway for users to request or execute deletion of all data associated with their app. Because <strong>Expense Manager</strong> stores 100% of data locally on your physical device without remote accounts, deletion is immediate and completely under your direct control.
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Method 1: In-App Database Reset (Recommended)</h2>
                <p className="text-xs sm:text-sm">
                  You can permanently delete all expense records, categories, and custom budgets directly inside the app:
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                  <ol className="list-decimal list-inside space-y-2 text-slate-700">
                    <li>Open <strong>Expense Manager</strong> on your Android phone.</li>
                    <li>Tap the <strong>Settings</strong> icon (gear icon in the top corner).</li>
                    <li>Scroll down to the <strong>Data Management</strong> section.</li>
                    <li>Tap <strong>&quot;Reset All Data / Clear Database&quot;</strong>.</li>
                    <li>Confirm the deletion prompt. All transactions, budgets, and settings will be permanently wiped immediately.</li>
                  </ol>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Method 2: Via Android System Settings</h2>
                <p className="text-xs sm:text-sm">
                  You can purge the local application sandbox using Android&apos;s native operating system controls:
                </p>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                  <ol className="list-decimal list-inside space-y-2 text-slate-700">
                    <li>Open your device <strong>Settings</strong> app.</li>
                    <li>Tap <strong>Apps</strong> or <strong>Application Manager</strong>.</li>
                    <li>Select <strong>Expense Manager</strong> from the installed app list.</li>
                    <li>Tap <strong>Storage & cache</strong> (or <strong>Storage</strong>).</li>
                    <li>Tap <strong>&quot;Clear Storage&quot;</strong> (or <strong>&quot;Clear Data&quot;</strong>).</li>
                    <li>All locally held SQLite tables and cache files are purged instantly.</li>
                  </ol>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Method 3: Full App Uninstall</h2>
                <p className="text-xs sm:text-sm">
                  Simply long-press the Expense Manager icon on your home screen or app drawer and tap <strong>Uninstall</strong>. Android will automatically delete the app&apos;s isolated data directory and all financial entries stored within it.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">Questions or Assistance</h2>
                <p className="text-xs sm:text-sm">
                  If you need any guidance or have questions regarding data safety and erasure, please email the developer at{' '}
                  <a href={`mailto:${APP_CONFIG.developerEmail}`} className="text-emerald-600 font-bold hover:underline">
                    {APP_CONFIG.developerEmail}
                  </a>.
                </p>
              </section>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
