export const __rspack_esm_id = 1550;
export const __rspack_esm_ids = [1550];
export const __webpack_modules__ = {
  23293(e, t, o) {
    let a = `article-footer-last-modified = Cette page a \xe9t\xe9 modifi\xe9e le <time data-l10n-name="date">{ $date }</time> par les <a data-l10n-name="contributors">contributeur\xb7ice\xb7s du MDN</a>.
article-footer-source-title = Dossier : { $folder } (Ouvre un onglet)
baseline-asterisk = Certaines parties de cette fonctionnalit\xe9 peuvent b\xe9n\xe9ficier de prise en charge variables.
baseline-high-extra = Cette fonctionnalit\xe9 est bien \xe9tablie et fonctionne sur de nombreux appareils et versions de navigateurs. Elle est disponible sur tous les navigateurs depuis { $date }.
baseline-low-extra = Depuis { $date }, cette fonctionnalit\xe9 fonctionne sur les appareils et les versions de navigateur les plus r\xe9cents. Elle peut ne pas fonctionner sur les appareils ou navigateurs plus anciens.
baseline-not-extra = Cette fonctionnalit\xe9 n'est pas Compatible car elle ne fonctionne pas dans certains des navigateurs les plus utilis\xe9s.
baseline-supported-in = Pris en charge dans { $browsers }
baseline-unsupported-in = Pas compl\xe8tement pris en charge dans { $browsers }
baseline-supported-and-unsupported-in = Pris en charge dans { $supported }, mais pas compl\xe8tement pris en charge dans { $unsupported }
baseline-signals = Vous voulez une meilleure prise en charge pour cette fonctionnalit\xe9 ? <a data-l10n-name="link">Dites-nous pourquoi.</a>
homepage-hero-title = Des ressources pour les D\xe9veloppeuses et D\xe9veloppeurs,<br> par des D\xe9veloppeuses et D\xe9veloppeurs
playground-user-shared-warning = Il s'agit d'un terrain d'essai partag\xe9 par un\xb7e utilisateur\xb7ice.<br>Inspectez toujours le code avant de l'ex\xe9cuter.
homepage-hero-description = Documenter le <a data-l10n-name="css">CSS</a>, le <a data-l10n-name="html">HTML</a> et le <a data-l10n-name="js">JavaScript</a>, depuis 2005.
not-found-title = Page non trouv\xe9e
not-found-description = D\xe9sol\xe9, la page <code data-l10n-name="url">{ $url }</code> n'a pas \xe9t\xe9 trouv\xe9e.
not-found-fallback-english = <strong data-l10n-name="strong">Bonne nouvelle :</strong> La page que vous cherchez existe en <em data-l10n-name="em">Anglais</em>.
not-found-fallback-search = La page que vous avez demand\xe9e n'existe pas, mais vous pouvez essayer une recherche sur le site pour :
not-found-back = Retour \xe0 la page d'accueil
footer-copyright = Certaines parties de ce contenu sont prot\xe9g\xe9es par le droit d'auteur \xa91998—{ $year } des contributeurs individuels de mozilla.org. Contenu disponible sous <a data-l10n-name="cc">une licence Creative Commons</a>.
search-modal-site-search = Rechercher sur le site <em>{ $query }</em>
site-search-search-stats = { $results } documents trouv\xe9s.
site-search-suggestion-matches =
    { $relation ->
        [gt]
            plus que { $matches ->
                [one] { $matches } trouv\xe9
               *[other] { $matches } trouv\xe9s
            }
       *[eq]
            { $matches ->
                [one] { $matches } trouv\xe9
                *[other] { $matches } trouv\xe9s
            }
    }
blog-time-to-read =
    { $minutes ->
        [one] { $minutes } minute de lecture
        *[other] { $minutes } minutes de lecture
    }
-brand-name-obs = HTTP Observatory
obs-report = Rapport
obs-title = { -brand-name-obs }
obs-landing-intro = Lanc\xe9 en 2016, { -brand-name-obs } am\xe9liore la s\xe9curit\xe9 du Web en analysant la conformit\xe9 aux meilleures pratiques en mati\xe8re de s\xe9curit\xe9. Il a fourni des informations \xe0 plus de 6,9 millions de sites web gr\xe2ce \xe0 47 millions d'analyses.
obs-assessment = D\xe9velopp\xe9 par Mozilla, { -brand-name-obs } effectue une \xe9valuation approfondie des en-t\xeates HTTP d'un site et d'autres configurations de s\xe9curit\xe9 cl\xe9s.
obs-scanning = Son processus d'analyse automatis\xe9 fournit aux d\xe9veloppeur\xb7euse\xb7s et aux administrateur\xb7ice\xb7s de sites web des commentaires d\xe9taill\xe9s et exploitables, ax\xe9s sur l'identification et la r\xe9solution des failles de s\xe9curit\xe9 potentielles.
obs-security = Cet outil aide les d\xe9veloppeur\xb7euse\xb7s et les administrateur\xb7ice\xb7s de sites web \xe0 renforcer la s\xe9curit\xe9 de leurs sites contre les menaces courantes dans un environnement num\xe9rique en constante \xe9volution.
obs-mdn = { -brand-name-obs } fournit des informations efficaces en mati\xe8re de s\xe9curit\xe9, guid\xe9es par l'expertise et l'engagement de Mozilla en faveur d'un Internet plus s\xfbr et plus s\xe9curis\xe9, et bas\xe9es sur des tendances et des directives bien \xe9tablies.
compat-browser-version-date = { $browser } { $version } — Date de sortie : { $date }
compat-browser-version-released = Date de sortie : { $date }
compat-link-source-title = Fichier : { $filename }
compat-branch-prefix = Pr\xe9fixe : <code data-l10n-name="prefix">{ $prefix }</code>
compat-branch-altname = Nom alternatif : <code data-l10n-name="altname">{ $altname }</code>
compat-branch-prefix-altname = Pr\xe9fixe : <code data-l10n-name="prefix">{ $prefix }</code>, Nom alternatif : <code data-l10n-name="altname">{ $altname }</code>
compat-support-removed = Supprim\xe9 en version { $version } et sup\xe9rieure
compat-support-see-impl-url = Voir <a data-l10n-name="impl_url">{ $label }</a>
compat-support-flag-range =
    { $version_range ->
        [range] De la version { $version_added } jusqu'\xe0 { $version_last }, les utilisateur\xb7ice\xb7s
        [from] \xc0 partir de la version { $version_added }, les utilisateur\xb7ice\xb7s
        [until] Jusqu'\xe0 la version { $version_last }, les utilisateur\xb7ice\xb7s
       *[none] Les utilisateur\xb7ice\xb7s
    } doivent explicitement d\xe9finir { $flag_type ->
       *[preference] la pr\xe9f\xe9rence <code data-l10n-name="name">{ $flag_name }</code>
        [runtime_flag] l'indicateur d'ex\xe9cution <code data-l10n-name="name">{ $flag_name }</code>
    }{ $has_value ->
        [1] { " " }sur <code data-l10n-name="value">{ $flag_value }</code>
       *[0] { "" }
    }.{ $has_pref_url ->
        [1]
            { $flag_type ->
                [preference] { " " }Pour changer les pr\xe9f\xe9rences dans { $browser_name }, visitez { $browser_pref_url }.
               *[other] { "" }
            }
       *[0] { "" }
    }
compat-legend-yes = { compat-support-full }
compat-legend-partial = { compat-support-partial }
compat-legend-preview = En cours de d\xe9veloppement. Pris en charge dans une pr\xe9-version.
compat-legend-no = { compat-support-no }
compat-legend-unknown = Compatibilit\xe9 inconnue
compat-legend-experimental = { compat-experimental }. Attendez-vous \xe0 ce que les comportements changent \xe0 l'avenir.
compat-legend-nonstandard = { compat-nonstandard }. V\xe9rifiez la compatibilit\xe9 entre les navigateurs avant utilisation.
compat-legend-deprecated = { compat-deprecated }. Ne pas utiliser dans les nouveaux sites web.
compat-legend-footnote = Voir les notes de mise en application.
compat-legend-disabled = L'utilisateur\xb7ice doit explicitement activer cette fonctionnalit\xe9.
compat-legend-altname = Utilise un nom hors standard.
compat-legend-prefix = N\xe9cessite un pr\xe9fixe vendeur ou un nom diff\xe9rent pour \xeatre utilis\xe9.
compat-legend-more = Contient davantage d'informations sur la compatibilit\xe9.
placement-note = Publicit\xe9
placement-no = Vous ne voulez pas voir de publicit\xe9s ?
pagination-next = Page suivante
pagination-prev = Page pr\xe9c\xe9dente
pagination-current = Page actuelle
pagination-goto = Aller \xe0 la page { $page }
logout = Se d\xe9connecter
login = Se connecter
example-play-button-label = Ex\xe9cuter
example-play-button-title = Ex\xe9cutez l'exemple dans MDN Playground (ouvre un nouvel onglet)
writer-reload-polling = Analyse toutes les { $seconds }s
a11y-menu-skip-to-main-content = Passer au contenu principal
a11y-menu-skip-to-search = Passer \xe0 la recherche
article-footer-title = Aider \xe0 am\xe9liorer MDN
article-footer-learn-how-to-contribute = Apprendre \xe0 contribuer
article-footer-view-this-page-on-github = Voir cette page sur GitHub
article-footer-this-will-take-you-to-github-to = Cela vous m\xe8nera \xe0 GitHub pour cr\xe9er un nouveau probl\xe8me.
article-footer-report-a-problem-with-this-conte = Signaler un probl\xe8me avec ce contenu
baseline-indicator-deprecated = Obsol\xe8te
baseline-indicator-limited-availability = Disponibilit\xe9 limit\xe9e
baseline-indicator-baseline = Baseline
baseline-indicator-widely-available = Large disponibilit\xe9
baseline-indicator-newly-available = Nouvellement disponible
baseline-indicator-baseline-cross = Croix de Baseline
baseline-indicator-baseline-check = Coche de Baseline
baseline-indicator-to-be-removed = En cours de suppression
baseline-indicator-pending-removal = Cette fonctionnalit\xe9 est en cours de suppression des navigateurs. L'utiliser maintenant peut entra\xeener un dysfonctionnement dans les futures mises \xe0 jour.
baseline-indicator-avoid-using = \xc9vitez d'utiliser cette fonctionnalit\xe9 dans de nouveaux projets.
baseline-indicator-candidate-for-removal = Cette fonctionnalit\xe9 peut \xeatre candidate \xe0 la suppression des standards web ou des navigateurs.
baseline-indicator-alternatives-use = Utilisez plut\xf4t les fonctionnalit\xe9s suivantes :
baseline-indicator-alternatives-consider = Envisagez d'utiliser plut\xf4t les fonctionnalit\xe9s suivantes :
baseline-indicator-alternatives-end = .
baseline-indicator-baseline-discouraged = D\xe9conseill\xe9 par la Baseline
baseline-indicator-baseline-discouraged-cross = Croix d\xe9conseill\xe9e de Baseline
baseline-indicator-check = coche
baseline-indicator-cross = croix
baseline-indicator-learn-more = En savoir plus
baseline-indicator-see-full-compatibility = Voir la compatibilit\xe9 compl\xe8te
blog-previous = Article pr\xe9c\xe9dent
blog-next = Article suivant
blog-index-blog-it-better = Bloguez mieux
reference-toc-header = Dans cet article
blog-post-not-found = Article de blog introuvable.
collection-save-button-save-in-collection = Enregistrer dans la collection
collection-save-button-remove = Supprimer
collection-save-button-save = Enregistrer
collection-save-button-add-to-collection = Ajouter \xe0 la collection
collection-save-button-collection = Collection :
collection-save-button-saved-articles = Articles enregistr\xe9s
collection-save-button-new-collection = Nouvelle collection
collection-save-button-name = Nom :
collection-save-button-note = Note :
collection-save-button-saving = Enregistrement…
collection-save-button-cancel = Annuler
collection-save-button-deleting = Suppression…
collection-save-button-delete = Supprimer
theme-default = Automatique
color-theme-light = Clair
color-theme-dark = Sombre
color-theme-switch-color-theme = Changer le th\xe8me de couleur
color-theme-theme = Th\xe8me
compat-link-report-issue-title = Signaler un probl\xe8me avec ces donn\xe9es de compatibilit\xe9
compat-link-report-issue = Signaler des probl\xe8mes avec ces donn\xe9es de compatibilit\xe9
compat-link-source = Voir les donn\xe9es sur GitHub
compat-experimental = Exp\xe9rimental
compat-deprecated = Obsol\xe8te
compat-nonstandard = Non standard
compat-support-partial = Prise en charge partielle
compat-support-preview-browser = Pris en charge dans une pr\xe9-version du navigateur
compat-support-full = Prise en charge compl\xe8te
compat-support-no = Pas de prise en charge
compat-support-unknown = Prise en charge inconnue
compat-support-preview = Pris en charge dans une pr\xe9-version.
compat-yes = Oui
compat-partial = Partiel
compat-no = Non
compat-legend = L\xe9gende
compat-legend-tip = Astuce : cliquer/appuyer sur une cellule pour obtenir plus d'informations.
compat-link-report-missing-title = Signaler des donn\xe9es de compatibilit\xe9 manquantes
compat-link-report-missing = Signaler le probl\xe8me
compat-js-required = Activez JavaScript pour afficher ce tableau de compatibilit\xe9 des navigateurs.
compat-loading = Chargement…
content-feedback-content-is-out-of-date = Le contenu n'est pas \xe0 jour
content-feedback-missing-information = Informations manquantes
content-feedback-code-examples-not-working-as-exp = Les exemples de code ne fonctionnent pas comme pr\xe9vu
content-feedback-other = Autre
content-feedback-question = Cette page vous a-t-elle \xe9t\xe9 utile ?
content-feedback-yes = Oui
content-feedback-no = Non
content-feedback-reason = Pourquoi cette page ne vous a-t-elle pas \xe9t\xe9 utile ?
content-feedback-submit = Envoyer
content-feedback-thanks = Merci pour votre commentaire !
contributor-spotlight-want-to-be-part-of-the-journey = Voulez-vous faire partie de l'aventure ?
contributor-spotlight-our-constant-quest-for-innovatio = Notre qu\xeate constante d'innovation commence ici, avec vous. Chaque partie de MDN (docs, d\xe9mos et le site lui-m\xeame) provient de notre incroyable communaut\xe9 ouverte de d\xe9veloppeur\xb7euse\xb7s. Rejoignez-nous !
contributor-spotlight-get-involved = Participez
contributor-spotlight-contributor-profile = Profil de contributeur\xb7ice
copy-button-copied = Copi\xe9
copy-button-copy-failed = \xc9chec de la copie !
copy-button-copy = Copier
footer-mdn-on-github = MDN sur GitHub
footer-mdn-on-bluesky = MDN sur Bluesky
footer-mdn-on-x = MDN sur X
footer-mdn-on-mastodon = MDN sur Mastodon
footer-mdn-blog-rss-feed = Flux RSS du blog MDN
footer-mdn = MDN
footer-about = \xc0 propos
footer-blog = Blog
footer-mozilla-careers = Offres d'emploi chez Mozilla
footer-advertise-with-us = Faites de la publicit\xe9 avec nous
footer-mdn-plus = MDN Plus
footer-product-help = Assistance produit
footer-contribute = Contribuer
footer-mdn-community = Communaut\xe9 MDN
footer-community-resources = Ressources communautaires
footer-writing-guidelines = Directives de r\xe9daction
footer-mdn-discord = Discord MDN
footer-developers = D\xe9veloppeur\xb7euse\xb7s
footer-web-technologies = Technologies web
footer-learn-web-development = Apprendre le d\xe9veloppement web
footer-guides = Guides
footer-tutorials = Tutoriels
footer-glossary = Glossaire
footer-hacks-blog = Blog Hacks
footer-website-privacy-notice = Politique de confidentialit\xe9 du site web
footer-telemetry-settings = Param\xe8tres de t\xe9l\xe9m\xe9trie
footer-legal = Mentions l\xe9gales
footer-community-participation-guidelin = Directives de participation communautaire
footer-mdn-logo = Logo MDN
footer-tagline = Votre mod\xe8le pour un internet meilleur.
footer-mozilla-logo = Logo Mozilla
generic-toc__header = Dans cet article
homepage-body-featured-articles = Articles en vedette
homepage-body-latest-news = Derni\xe8res nouvelles
homepage-body-recent-contributions = Contributions r\xe9centes
homepage-contributor-spotlight-contributor-spotlight = Projecteur sur les contributeur\xb7ice\xb7s
homepage-contributor-spotlight-get-involved = Participez
homepage-search-search-the-site = Rechercher sur le site
homepage-search-search = Rechercher
interactive-example-reset = R\xe9initialiser
interactive-example-value-select = S\xe9lectionner une valeur
interactive-example-the-current-value-is-not-support = La valeur actuelle n'est pas prise en charge par votre navigateur.
interactive-example-run-example-and-show-console-ou = Ex\xe9cuter l'exemple et afficher la sortie de la console
interactive-example-run = Ex\xe9cuter
interactive-example-reset-example-and-clear-console = R\xe9initialiser l'exemple et effacer la console
interactive-example-console-output = Sortie de la console
interactive-example-output = Sortie
issues-table-loading-issues = chargement des probl\xe8mes…
issues-table-title = Titre
issues-table-repository = D\xe9p\xf4t
language-switcher-remember-language = Se souvenir de la langue
language-switcher-enable-this-setting-to-always-sw = Activez ce param\xe8tre pour toujours passer \xe0 la langue actuelle lorsque disponible. (Cliquez pour en savoir plus.)
language-switcher-learn-more = En savoir plus
login-button-login = Se connecter
modal-exit-modal = Quitter la fen\xeatre contextuelle
navigation-toggle-navigation = Basculer la navigation
obs-about-title = \xc0 propos de l'HTTP Observatory
observatory-landing-read-our-faq = Lire notre FAQ
observatory-landing-report-feedback = Faire un retour
observatory-rescan-button-rescan = Re-scanner
observatory-rescan-button-wait-a-minute-to-rescan = Attendez une minute pour re-scanner
observatory-results-report-feedback = Faire un retour
observatory-results-faq = FAQ
observatory-tests-and-scores-loading-tests-and-scoring-data = Chargement des tests et des donn\xe9es de notation...
observatory-tests-and-scores-see = Voir
observatory-tests-and-scores-for-guidance = pour des conseils.
observatory-tests-and-scores-test-result = R\xe9sultat du test
observatory-tests-and-scores-description = Description
observatory-tests-and-scores-modifier = Modifier
observatory-tests-and-scores-failed-to-load-tests-and-scoring = \xc9chec du chargement des tests et des donn\xe9es de notation. Veuillez r\xe9essayer plus tard.
blog-rss-title = Flux RSS du Blog MDN
brand-web-docs = MDN Web Docs
meta-description = Le site MDN Web Docs fournit des informations sur les technologies Web ouvertes, y compris HTML, CSS et les API pour les sites Web et les applications Web progressives.
logo-alt = Logo MDN
pagination-pagination = Pagination
playground-do-you-really-want-to-clear-ever = Voulez-vous vraiment tout effacer ?
playground-do-you-really-want-to-revert-you = Voulez-vous vraiment revenir sur vos modifications ?
playground-playground = Terrain d'essai
playground-format = Format
playground-run = Ex\xe9cuter
playground-share = Partager
playground-clear = Effacer
playground-reset = R\xe9initialiser
playground-seeing-something-inappropriate = Voir quelque chose d'inappropri\xe9 ?
playground-console = Console
playground-share-markdown = Partager le Markdown
playground-copy-markdown-to-clipboard = Copier le Markdown dans le presse-papiers
playground-share-data-url = Partager l'URL des donn\xe9es
playground-copy-data-url-to-clipboard = Copier l'URL des donn\xe9es dans le presse-papiers
playground-share-your-code-via-permalink = Partager votre code avec un lien permanent
playground-copy-to-clipboard = Copier dans le presse-papiers
playground-create-link = Cr\xe9er un lien
playground-report-this-malicious-or-inappro = Signaler ce terrain d'essai partag\xe9 comme malveillant ou inappropri\xe9.
playground-can-you-please-share-some-detail = Pouvez-vous partager quelques d\xe9tails sur ce qui ne va pas avec ce contenu :
playground-cancel = Annuler
playground-report = Signaler
recently-visited-recently-visited = R\xe9cemment visit\xe9
scrim-inline-clicking-will-load-content-from = Cliquer chargera le contenu depuis scrimba.com
scrim-inline-toggle-fullscreen = Basculer en plein \xe9cran
scrim-inline-open-on-scrimba = Ouvrir sur Scrimba
scrim-inline-load-scrim-and-open-dialog = Charger le scrim et ouvrir la bo\xeete de dialogue.
search-button-search-the-site = Rechercher sur le site
search-modal-loading-search-index = Chargement de l'index de recherche…
search-modal-search = Rechercher
search-modal-exit-search = Quitter la recherche
sidebar-filter-filter-sidebar = Filtrer la barre lat\xe9rale
sidebar-filter-filter = Filtrer
sidebar-filter-clear-filter-input = Effacer le filtre
site-search-search = Rechercher
site-search-previous = Pr\xe9c\xe9dent
site-search-next = Suivant
site-search-suggestions-text = Voulez-vous dire…
site-search-searching = Recherche en cours…
site-search-language = Langue
site-search-both = Les deux
specifications-list-this-feature-does-not-appear-to = Cette fonctionnalit\xe9 ne semble pas \xeatre d\xe9finie dans une sp\xe9cification.
specifications-list-specification = Sp\xe9cification
survey-hide-this-survey = Masquer ce sondage
survey-take-survey-opens-in-a-new-tab = Participer au sondage (s'ouvre dans un nouvel onglet)
toggle-sidebar-toggle-sidebar = Basculer la barre lat\xe9rale
user-menu-ai-help = Aide IA
user-menu-collections = Collections
user-menu-updates = Mises \xe0 jour
user-menu-settings = Mes param\xe8tres
user-menu-help = Aide
user-menu-feedback = Retour
user-menu-user = Utilisateur\xb7ice
writer-open-editor-open-in-editor = Ouvrir dans l'\xe9diteur
writer-toolbar-view-on-mdn = Voir sur MDN
`;
    o.d(t, {}, { default: a });
  }
};
//# sourceMappingURL=1550.8a049e82a0be2b66.js.map
