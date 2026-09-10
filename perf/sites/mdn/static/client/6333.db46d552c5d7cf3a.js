export const __rspack_esm_id = 6333;
export const __rspack_esm_ids = [6333];
export const __webpack_modules__ = {
  89516(e, n, t) {
    let i = `content-feedback-question = War diese \xdcbersetzung hilfreich?
content-feedback-reason = Warum war diese \xdcbersetzung nicht hilfreich?
content-feedback-thanks = Vielen Dank f\xfcr die R\xfcckmeldung!

footer-tagline = Der Bauplan f\xfcr ein besseres Internet.
footer-copyright = Teile dieses Inhalts sind \xa91998–{ $year } von einzelnen mozilla.org-Mitwirkenden. Inhalte sind verf\xfcgbar unter <a data-l10n-name="cc">einer Creative-Commons-Lizenz</a>.

search-modal-site-search = Website-Suche nach <em>{ $query }</em>

site-search-search-stats = { $results } Dokumente gefunden.
site-search-suggestion-matches =  { $relation ->
    [gt] mehr als { $matches ->
        [one]   { $matches } \xdcbereinstimmung
       *[other] { $matches } \xdcbereinstimmungen
    }
   *[eq] { $matches ->
        [one]   { $matches } \xdcbereinstimmung
       *[other] { $matches } \xdcbereinstimmungen
    }
}

blog-time-to-read = { $minutes ->
    [one]   { $minutes } Minute Lesezeit
   *[other] { $minutes } Minuten Lesezeit
}

-brand-name-obs = HTTP Observatory
obs-report = Bericht
obs-title = { -brand-name-obs }
obs-landing-intro = Seit 2016 verbessert { -brand-name-obs } die Sicherheit durch Analyse der Einhaltung bew\xe4hrter Sicherheitspraktiken. Es hat durch 47 Millionen Scans Einblicke in \xfcber 6,9 Millionen Websites geliefert.
obs-assessment = Das von Mozilla entwickelte { -brand-name-obs } f\xfchrt eine umfassende Bewertung der HTTP-Header und weiterer zentraler Sicherheitskonfigurationen einer Website durch.
obs-scanning = Der automatisierte Scan-Prozess liefert detailliertes, handlungsorientiertes Feedback f\xfcr Entwicklungsteams und Website-Administration und konzentriert sich darauf, potenzielle Sicherheitsl\xfccken zu erkennen und zu beheben.
obs-security = Das Tool unterst\xfctzt Entwicklungsteams und Website-Administration dabei, Websites in einem sich stetig weiterentwickelnden digitalen Umfeld gegen h\xe4ufige Sicherheitsbedrohungen abzusichern.
obs-mdn = Das { -brand-name-obs } bietet wirksame Sicherheitseinblicke auf Grundlage von Mozillas Expertise und Engagement f\xfcr ein sichereres Internet sowie basierend auf etablierten Trends und Richtlinien.

article-footer-last-modified = Diese Seite wurde zuletzt am <time data-l10n-name="date">{ $date }</time> von <a data-l10n-name="contributors">MDN-Mitwirkenden</a> bearbeitet.
article-footer-source-title = Ordner: { $folder } (\xf6ffnet in neuem Tab)
baseline-asterisk = Einige Teile dieser Funktion werden m\xf6glicherweise unterschiedlich gut unterst\xfctzt.
baseline-high-extra = Diese Funktion ist gut etabliert und funktioniert auf vielen Ger\xe4ten und in vielen Browserversionen. Sie ist seit { $date } browser\xfcbergreifend verf\xfcgbar.
baseline-low-extra = Seit { $date } funktioniert diese Funktion auf aktuellen Ger\xe4ten und in aktuellen Browserversionen. Auf \xe4lteren Ger\xe4ten oder in \xe4lteren Browsern funktioniert sie m\xf6glicherweise nicht.
baseline-not-extra = Diese Funktion ist nicht Baseline, da sie in einigen der am weitesten verbreiteten Browser nicht funktioniert.
baseline-supported-in = Unterst\xfctzt in { $browsers }
baseline-unsupported-in = In { $browsers } nicht weitgehend unterst\xfctzt
baseline-supported-and-unsupported-in = Unterst\xfctzt in { $supported }, aber in { $unsupported } nicht weitgehend unterst\xfctzt
homepage-hero-title = Ressourcen f\xfcr Entwickelnde,<br> von Entwickelnden
homepage-hero-description = Dokumentation zu <a data-l10n-name="css">CSS</a>, <a data-l10n-name="html">HTML</a> und <a data-l10n-name="js">JavaScript</a> – seit 2005.
not-found-title = Seite nicht gefunden
not-found-description = Entschuldigung, die Seite <code data-l10n-name="url">{ $url }</code> wurde nicht gefunden.
not-found-fallback-english = <strong data-l10n-name="strong">Gute Nachricht:</strong> Die angeforderte Seite existiert auf <em data-l10n-name="em">Englisch</em>.
not-found-fallback-search = Die angeforderte Seite existiert nicht, aber Sie k\xf6nnten eine Website-Suche versuchen nach:
not-found-back = Zur\xfcck zur Startseite
compat-browser-version-date = { $browser } { $version } – Ver\xf6ffentlichungsdatum: { $date }
compat-browser-version-released = Ver\xf6ffentlichungsdatum: { $date }
compat-link-source-title = Datei: { $filename }
compat-support-removed = Ab { $version } entfernt
compat-support-see-impl-url = Siehe <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flags =
    { $has_added ->
        [1] Ab Version { $version_added }
        *[0] { "" }
    }{ $has_last ->
        [1]
            { $has_added ->
                *[0] Bis { $versionLast } muss
                [1] { " " }bis { $versionLast } muss
            }
        *[0]
            { $has_added ->
                *[0] muss
                [1] { " " }muss
            }
    }
    { " " }die Einstellung <code data-l10n-name="name">{ $flag_name }</code>{ " " }
    { $flag_type ->
        *[preference] explizit festgelegt werden
        [runtime_flag] als Laufzeit-Flag explizit festgelegt werden

    }{ $has_value ->
        [1] { " " }auf <code data-l10n-name="value">{ $flag_value }</code>
        *[0] { "" }
    }{ "." }
    { $has_pref_url ->
        [1]
            { $flag_type ->
                [preference] Um die Einstellungen in { $browser_name } zu \xe4ndern, besuchen Sie { $browser_pref_url }.
                *[other] { "" }
            }
        *[0] { "" }
    }
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = In Entwicklung. In einer Vorabversion unterst\xfctzt.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Kompatibilit\xe4t unbekannt
compat-legend-experimental = { compat-experimental }. Verhaltens\xe4nderungen in der Zukunft sind zu erwarten.
compat-legend-nonstandard = { compat-nonstandard }. \xdcberpr\xfcfen Sie die browser\xfcbergreifende Unterst\xfctzung vor der Verwendung.
compat-legend-deprecated = { compat-deprecated }. Nicht f\xfcr neue Websites verwenden.
compat-legend-footnote = Implementierungshinweise ansehen.
compat-legend-disabled = Diese Funktion muss explizit aktiviert werden.
compat-legend-altname = Verwendet einen nicht standardm\xe4\xdfigen Namen.
compat-legend-prefix = Erfordert ein Hersteller-Pr\xe4fix oder einen anderen Namen zur Verwendung.
compat-legend-more = Hat mehr Kompatibilit\xe4tsinformationen.
placement-note = Anzeige
placement-no = Keine Werbung erw\xfcnscht?
pagination-next = N\xe4chste Seite
pagination-prev = Vorherige Seite
pagination-current = Aktuelle Seite
pagination-goto = Zur Seite { $page }
logout = Abmelden
login = Anmelden
example-play-button-label = Abspielen
example-play-button-title = Beispiel im MDN Playground ausf\xfchren (\xf6ffnet in neuem Tab)
writer-reload-polling = Aktualisierung alle { $seconds } s
a11y-menu-skip-to-main-content = Zum Hauptinhalt springen
a11y-menu-skip-to-search = Zur Suche springen
article-footer-learn-how-to-contribute = Erfahren Sie, wie Sie beitragen k\xf6nnen
article-footer-view-this-page-on-github = Diese Seite auf GitHub ansehen
article-footer-this-will-take-you-to-github-to = Dies f\xfchrt Sie zu GitHub, um ein neues Problem zu melden.
article-footer-report-a-problem-with-this-conte = Ein Problem mit diesem Inhalt melden
baseline-indicator-baseline-cross = Baseline (nicht erf\xfcllt)
baseline-indicator-baseline-check = Baseline (erf\xfcllt)
baseline-indicator-limited-availability = Eingeschr\xe4nkt verf\xfcgbar
baseline-indicator-baseline = Baseline
baseline-indicator-widely-available = Weitgehend verf\xfcgbar
baseline-indicator-newly-available = Neu verf\xfcgbar
baseline-indicator-check = H\xe4kchen
baseline-indicator-cross = Kreuz
baseline-indicator-learn-more = Mehr erfahren
baseline-indicator-see-full-compatibility = Vollst\xe4ndige Kompatibilit\xe4t anzeigen
baseline-indicator-report-feedback = Feedback geben
blog-previous = Vorheriger Beitrag
blog-next = N\xe4chster Beitrag
blog-index-blog-it-better = Blog it better
reference-toc-header = In diesem Artikel
blog-post-not-found = Blogartikel nicht gefunden.
collection-save-button-save-in-collection = In einer Sammlung speichern
collection-save-button-remove = Entfernen
collection-save-button-save = Speichern
collection-save-button-add-to-collection = Zur Sammlung hinzuf\xfcgen
collection-save-button-collection = Sammlung:
collection-save-button-saved-articles = Gespeicherte Artikel
collection-save-button-new-collection = Neue Sammlung
collection-save-button-name = Name:
collection-save-button-note = Notiz:
collection-save-button-saving = Wird gespeichert…
collection-save-button-cancel = Abbrechen
collection-save-button-deleting = Wird gel\xf6scht…
collection-save-button-delete = L\xf6schen
theme-default = Systemeinstellung
color-theme-light = Hell
color-theme-dark = Dunkel
color-theme-switch-color-theme = Farbschema wechseln
color-theme-theme = Farbschema
compat-link-report-issue-title = Ein Problem mit diesen Kompatibilit\xe4tsdaten melden
compat-link-report-issue = Probleme mit diesen Kompatibilit\xe4tsdaten melden
compat-link-source = Daten auf GitHub ansehen
compat-experimental = Experimentell
compat-deprecated = Veraltet
compat-nonstandard = Nicht standardisiert
compat-support-partial = Teilweise unterst\xfctzt
compat-support-preview-browser = Unterst\xfctzung in einer Vorabversion des Browsers
compat-support-full = Vollst\xe4ndig unterst\xfctzt
compat-support-no = Nicht unterst\xfctzt
compat-support-unknown = Unterst\xfctzung unbekannt
compat-yes = Ja
compat-partial = Teilweise
compat-no = Nein
compat-support-preview = Unterst\xfctzt in Vorabversion
compat-legend = Legende
compat-legend-tip = Tipp: Sie k\xf6nnen auf eine Zelle klicken oder tippen, um weitere Informationen zu erhalten.
compat-link-report-missing-title = Fehlende Kompatibilit\xe4tsdaten melden
compat-link-report-missing = Dieses Problem melden
compat-js-required = JavaScript aktivieren, um diese Browser-Kompatibilit\xe4tstabelle anzuzeigen.
compat-loading = Wird geladen…
content-feedback-content-is-out-of-date = Inhalt ist veraltet
content-feedback-missing-information = Fehlende Informationen
content-feedback-code-examples-not-working-as-exp = Codebeispiele funktionieren nicht wie erwartet
content-feedback-other = Sonstiges
content-feedback-yes = Ja
content-feedback-no = Nein
content-feedback-submit = Absenden
contributor-spotlight-want-to-be-part-of-the-journey = M\xf6chten Sie Teil der Reise sein?
contributor-spotlight-our-constant-quest-for-innovatio = Unsere st\xe4ndige Suche nach Innovation beginnt hier, mit Ihnen. Jeder Teil von MDN (Dokumentationen, Demos und die Website selbst) entsteht aus unserer gro\xdfartigen offenen Entwicklergemeinschaft. Bitte machen Sie mit!
contributor-spotlight-get-involved = Mitmachen
contributor-spotlight-contributor-profile = Mitwirkendenprofil
copy-button-copied = Kopiert
copy-button-copy-failed = Kopieren fehlgeschlagen!
copy-button-copy = Kopieren
footer-mdn-on-github = MDN auf GitHub
footer-mdn-on-bluesky = MDN auf Bluesky
footer-mdn-on-x = MDN auf X
footer-mdn-on-mastodon = MDN auf Mastodon
footer-mdn-blog-rss-feed = MDN-Blog-RSS-Feed
footer-mdn = MDN
footer-about = \xdcber uns
footer-blog = Blog
footer-mozilla-careers = Jobs bei Mozilla
footer-advertise-with-us = Mit uns werben
footer-mdn-plus = MDN Plus
footer-product-help = Produkthilfe
footer-contribute = Mitmachen
footer-mdn-community = MDN-Community
footer-community-resources = Community-Ressourcen
footer-writing-guidelines = Schreibrichtlinien
footer-mdn-discord = MDN-Discord
footer-developers = Entwicklung
footer-web-technologies = Webtechnologien
footer-learn-web-development = Webentwicklung lernen
footer-guides = Leitf\xe4den
footer-tutorials = Tutorials
footer-glossary = Glossar
footer-hacks-blog = Hacks-Blog
footer-website-privacy-notice = Datenschutzerkl\xe4rung der Website
footer-telemetry-settings = Telemetrie-Einstellungen
footer-legal = Rechtliches
footer-community-participation-guidelin = Community-Teilnahmerichtlinien
footer-mdn-logo = MDN-Logo
footer-mozilla-logo = Mozilla-Logo
generic-toc__header = In diesem Artikel
homepage-body-featured-articles = Ausgew\xe4hlte Artikel
homepage-body-latest-news = Neuigkeiten
homepage-body-recent-contributions = Neueste Beitr\xe4ge
homepage-contributor-spotlight-contributor-spotlight = Mitwirkende im Fokus
homepage-contributor-spotlight-get-involved = Mitmachen
homepage-search-search-the-site = Website durchsuchen
homepage-search-search = Suche
interactive-example-reset = Zur\xfccksetzen
interactive-example-value-select = Wertauswahl
interactive-example-the-current-value-is-not-support = Der aktuelle Wert wird von Ihrem Browser nicht unterst\xfctzt.
interactive-example-run-example-and-show-console-ou = Beispiel ausf\xfchren und Konsolenausgabe anzeigen
interactive-example-run = Ausf\xfchren
interactive-example-reset-example-and-clear-console = Beispiel zur\xfccksetzen und Konsolenausgabe l\xf6schen
interactive-example-console-output = Konsolenausgabe
interactive-example-output = Ausgabe
issues-table-loading-issues = GitHub-Issues werden geladen…
issues-table-title = Titel
issues-table-repository = Repository
language-switcher-remember-language = Sprache merken
language-switcher-enable-this-setting-to-always-sw = Aktivieren Sie diese Einstellung, um immer zur aktuell ausgew\xe4hlten Sprache zu wechseln, wenn sie verf\xfcgbar ist. (Klicken Sie hier, um mehr zu erfahren.)
language-switcher-learn-more = Mehr erfahren
login-button-login = Anmelden
modal-exit-modal = Modal schlie\xdfen
navigation-toggle-navigation = Navigation umschalten
obs-about-title = \xdcber das HTTP Observatory
observatory-landing-read-our-faq = FAQ lesen
observatory-landing-report-feedback = Feedback geben
observatory-rescan-button-rescan = Erneut scannen
observatory-rescan-button-wait-a-minute-to-rescan = Warten Sie eine Minute, um erneut zu scannen
observatory-results-report-feedback = Feedback geben
observatory-results-faq = FAQ
observatory-tests-and-scores-loading-tests-and-scoring-data = Tests und Bewertungsdaten werden geladen…
observatory-tests-and-scores-see = Siehe
observatory-tests-and-scores-for-guidance = f\xfcr weitere Hinweise.
observatory-tests-and-scores-test-result = Testergebnis
observatory-tests-and-scores-description = Beschreibung
observatory-tests-and-scores-modifier = Modifikator
observatory-tests-and-scores-failed-to-load-tests-and-scoring = Tests und Bewertungsdaten konnten nicht geladen werden. Bitte versuchen Sie es sp\xe4ter erneut.
pagination-pagination = Seitennavigation
playground-do-you-really-want-to-clear-ever = Wirklich alles l\xf6schen?
playground-do-you-really-want-to-revert-you = Alle \xc4nderungen zur\xfccksetzen?
playground-playground = Playground
playground-format = Formatieren
playground-run = Ausf\xfchren
playground-share = Teilen
playground-clear = Leeren
playground-reset = Zur\xfccksetzen
playground-seeing-something-inappropriate = Sehen Sie etwas Unangemessenes?
playground-console = Konsole
playground-share-markdown = Markdown teilen
playground-copy-markdown-to-clipboard = Markdown in die Zwischenablage kopieren
playground-share-data-url = Code via Daten-URL teilen
playground-copy-data-url-to-clipboard = Daten-URL in die Zwischenablage kopieren
playground-share-your-code-via-permalink = Code via Permalink teilen
playground-copy-to-clipboard = In die Zwischenablage kopieren
playground-create-link = Link erstellen
playground-report-this-malicious-or-inappro = Diesen Playground wegen sch\xe4dlicher oder unangemessener Inhalte melden
playground-can-you-please-share-some-detail = Bitte beschreiben Sie kurz, was an diesem Inhalt problematisch ist:
playground-cancel = Abbrechen
playground-report = Melden
recently-visited-recently-visited = Zuletzt besucht
scrim-inline-clicking-will-load-content-from = Durch Klicken werden Inhalte von scrimba.com geladen
scrim-inline-toggle-fullscreen = Vollbild umschalten
scrim-inline-open-on-scrimba = Auf Scrimba \xf6ffnen
scrim-inline-load-scrim-and-open-dialog = Scrim laden und Dialog \xf6ffnen.
search-button-search-the-site = Website durchsuchen
search-modal-loading-search-index = Suchindex wird geladen…
search-modal-search = Suche
search-modal-exit-search = Suche schlie\xdfen
sidebar-filter-filter-sidebar = Seitenleiste filtern
sidebar-filter-filter = Filtern
sidebar-filter-clear-filter-input = Filterfeld leeren
site-search-search = Suchen
site-search-previous = Zur\xfcck
site-search-next = Weiter
site-search-suggestions-text = Meinten Sie:
site-search-searching = Suche l\xe4uft…
site-search-language = Sprache
site-search-both = Beides
specifications-list-this-feature-does-not-appear-to = Diese Funktion scheint in keiner Spezifikation definiert zu sein.
specifications-list-specification = Spezifikation
survey-hide-this-survey = Diese Umfrage ausblenden
survey-take-survey-opens-in-a-new-tab = An der Umfrage teilnehmen (\xf6ffnet in neuem Tab)
toggle-sidebar-toggle-sidebar = Seitenleiste umschalten
user-menu-ai-help = KI-Hilfe
user-menu-collections = Sammlungen
user-menu-updates = Updates
user-menu-settings = Meine Einstellungen
user-menu-help = Hilfe
user-menu-feedback = Feedback
user-menu-user = Konto
writer-open-editor-open-in-editor = Im Editor \xf6ffnen
writer-toolbar-view-on-mdn = Auf MDN anzeigen
`;
    t.d(n, {}, { default: i });
  }
};
//# sourceMappingURL=6333.db46d552c5d7cf3a.js.map
