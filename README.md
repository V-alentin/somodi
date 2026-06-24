# Somodi Vendégház — weboldal

Statikus weboldal (HTML + CSS + vanilla JS), build nélkül. A Virella Luxury Hotel
sablon hangulatára épülő, prémium, sötét-meleg dizájn — saját design rendszerrel,
nem template-másolat.

> **Állapot:** a `images/` mappában a Somodi Vendégház **valódi fotói** vannak
> (HEIC → WebP, helyes tájolással). A tartalom a valós adatokra épül:
> 9177 Ásványráró, Tűzoltó utca 11. · +36 30 789 1496 (Németh Nikolett) ·
> +36 30 232 7108 (Somodi Bálint Gyula) · somodiniki1995@gmail.com · NTAK M49989.
>
> **⚠️ Két dolgot kell még pótolni az élesítés előtt:**
> 1. **Web3Forms access key** — a `kapcsolat.html`-ben a foglalási űrlapnál az
>    `<input name="access_key" value="YOUR-WEB3FORMS-ACCESS-KEY">` értékét cseréld
>    le a [web3forms.com](https://web3forms.com)-on ingyen generált saját kulcsodra.
>    Enélkül az űrlap csak vizuális visszajelzést ad, nem küld e-mailt. A kulccsal a
>    kérés a megadott e-mail címre érkezik, a vendég pedig automatikus visszaigazolót kap.
> 2. **Facebook-link** — amint megvan az oldal URL-je, told be a láblécbe (mind az
>    oldalon, az Instagram `<a>` mellé) és a `kapcsolat.html` „Közösségi média" blokkjába.
>    Az Instagram (`@somodi_vendeghaz`) már be van kötve.
>
> **Jogi oldalak:** `foglalasi-feltetelek.html`, `hazirend.html`, `wellness-hazirend.html`
> elkészültek; az adatkezelési tájékoztató jelenleg a meglévő WordPress-oldalra mutat
> (`somodivendeghaz.hu/adatvedelmi-iranyelvek/`). Ha kész az új szabályzat, készíts egy
> `adatkezeles.html`-t és állítsd át rá a linkeket.

## Gyors indítás

1. Dupla kattintás az `index.html`-re → megnyílik a böngészőben.
   *(A galéria lightbox és a naptár helyi `file://` megnyitással is működik.)*
2. Élesítéshez töltsd fel a **teljes mappát** bármilyen tárhelyre
   (pl. a meglévő `somodivendeghaz.hu`-ra, Vercelre, Netlify-ra, vagy sima FTP-re).
   Nincs szükség Node.js-re, build lépésre vagy adatbázisra.

## Mappaszerkezet

```
somodi/
├── index.html          ← Főoldal
├── szobak.html         ← Szobák (4 szoba, cikkcakk + képváltó)
├── wellness.html       ← Wellness & Felszereltség
├── galeria.html        ← Galéria (videó banner + képrács + lightbox)
├── kapcsolat.html      ← Kapcsolat & Foglalás (árak, naptár, űrlap)
├── css/style.css       ← Design rendszer + minden stílus
├── js/main.js          ← Interakciók (menü, carousel, naptár, lightbox, űrlap)
├── images/             ← IDE KERÜLNEK A KÉPEK (lásd lent)
└── README.md
```

---

## ⚠️ KÉPEK FELTÖLTÉSE (a legfontosabb lépés)

Jelenleg minden képhelyen sötét **placeholder** látszik a fájlnévvel.
A weboldal a `images/` mappából, **pontosan ezekkel a fájlnevekkel** tölti be a képeket.
Töltsd le a képeket a Google Drive-ról, nevezd át őket az alábbi táblázat szerint,
és másold be a `images/` mappába. Ennyi — a placeholderek automatikusan eltűnnek.

> Tipp: a Drive-on a fájl megnyitása után jobb felül a **Letöltés** gombbal töltsd le.

### Főoldal (index.html)

| Fájlnév a `images/` mappában | Tartalom | Drive-link |
|---|---|---|
| `banner.jpg` | Hero banner kép | https://drive.google.com/file/d/1N90hyTLethOFcs1V2Kb7SJ3IzNg9wysy/view |
| `banner.mp4` | *(opcionális)* Hero banner videó | https://drive.google.com/file/d/1Jy0cpNAXoJgJlc_6XEiCQl7OhfMCbz3m/view |
| `why-us.jpg` | „Miért válassz minket” melletti kép | https://drive.google.com/file/d/1cHY6IqRtOA0Nfx0khYmYMJu941ZuEl2G/view |
| `szoba-1.jpg` | Szobakártya: A Privát Lakosztály | https://drive.google.com/file/d/12CC8gwt34YwMsXQFuTXolPzZhEGEuRLu/view |
| `szoba-2.jpg` | Szobakártya: A Családi Fészek | https://drive.google.com/file/d/1Mq5MpwJXc_gtd-GR7HJLnpLd6Gd6yd5r/view |
| `szoba-3.jpg` | Szobakártya: Kilátás a természetre | https://drive.google.com/file/d/1jsSLeWtIkiDO9dW409vxaa1BQgB6o8Je/view |
| `szoba-4.jpg` | Szobakártya: A Reggeli Napfény | https://drive.google.com/file/d/1Zj0uNdGZeeuWdmy4hSaDtS43YXHFZbYm/view |
| `cta-bg.jpg` | Záró CTA háttér (lehet ugyanaz, mint a banner) | — |

### Szobák (szobak.html)

| Fájlnév | Tartalom | Drive-link |
|---|---|---|
| `szobak-banner.jpg` | Oldal banner | *(válassz egy szép enteriőrt)* |
| **1. szoba** | | |
| `szoba-1-1.jpg` | Fő kép | https://drive.google.com/file/d/1T0PCOTzxAakeGelh04Yjf6L9iOUzBFQj/view |
| `szoba-1-2.jpg` | További kép | https://drive.google.com/file/d/12CC8gwt34YwMsXQFuTXolPzZhEGEuRLu/view |
| `szoba-1-3.jpg` | További kép | mappa: https://drive.google.com/drive/folders/1pVPtxOj1XH1iSFTxP1chnIV4sefoP06f |
| **2. szoba** | | |
| `szoba-2-1.jpg` | Fő kép | https://drive.google.com/file/d/10QSqx5C9hN5KN2rHlxYxcGpLgBEbG7HF/view |
| `szoba-2-2.jpg` | További kép | https://drive.google.com/file/d/1Mq5MpwJXc_gtd-GR7HJLnpLd6Gd6yd5r/view |
| **3. szoba** | | |
| `szoba-3-1.jpg` | Fő kép | https://drive.google.com/file/d/1Dv73FxLAb8b1J8GeYzVyDXt_8WQYzfHj/view |
| `szoba-3-2.jpg` | További kép | https://drive.google.com/file/d/1zvdSU-esnlHffNRXNYcy19cPavoX6hYA/view |
| `szoba-3-3.jpg` | További kép | https://drive.google.com/file/d/1h0M6-Q_euHIhsIBAIiBNywAxnCqn0HcE/view |
| **4. szoba** | | |
| `szoba-4-1.jpg` | Fő kép | https://drive.google.com/file/d/1vWJwWDXHBC4uhkdUwRSpOMH1Eu0-3gw_/view |
| `szoba-4-2.jpg` | További kép | https://drive.google.com/file/d/17kYPMCfwn1P2edzFci3a1_d5mQ4wpUcl/view |
| `szoba-4-3.jpg` | További kép | https://drive.google.com/file/d/1Zj0uNdGZeeuWdmy4hSaDtS43YXHFZbYm/view |

> A szobák képváltója (carousel) annyi képet mutat, ahány `carousel__slide` van a HTML-ben.
> Ha több vagy kevesebb kép van, a `szobak.html`-ben könnyen hozzáadhatsz/törölhetsz egy
> `<div class="carousel__slide">…</div>` blokkot.

### Wellness (wellness.html)

| Fájlnév | Tartalom |
|---|---|
| `wellness-banner.jpg` | Oldal banner (pl. medence/jakuzzi este) |
| `wellness-1.jpg` | A „0–24 privát wellness” melletti kép |
| `szoba-1.jpg` … `szoba-4.jpg` | Szobakártyák (ugyanazok, mint a főoldalon) |

### Galéria (galeria.html)

| Fájlnév | Tartalom |
|---|---|
| `galeria.mp4` | Banner videó *(opcionális; addig placeholder)* |
| `galeria-poster.jpg` | A videó poszter-képe |
| `galeria-1.jpg` … `galeria-15.jpg` | A 15 galéria-kép |

### Kapcsolat (kapcsolat.html)

| Fájlnév | Tartalom | Drive-link |
|---|---|---|
| `kapcsolat-banner.jpg` | Oldal banner | https://drive.google.com/file/d/1FZTD1ZR2ijgINQLD2MnNtQaJZd4ctNnS/view |

---

## Még kitöltendő adatok (keresd a `TODO` kommenteket)

Ezeket a placeholder-adatokat cseréld le a valódira minden oldalon
(a fejlécben, láblécben és a kapcsolat oldalon szerepelnek):

- **Telefonszám:** jelenleg `+36 30 000 0000` → keresd a `tel:+36300000000` és a látható számot
- **Email:** jelenleg `info@somodivendeghaz.hu`
- **Cím:** a kapcsolat oldalon és a láblécben (`TODO: pontos cím`)
- **Közösségi média linkek:** a láblécben a Facebook/Instagram `href="#"` → valódi URL
- **Google Maps:** a `kapcsolat.html` alján van egy kikommentezett térkép-blokk,
  amit beágyazott Google Maps iframe-mel élővé tehetsz

> Gyors keresés: nyisd meg a fájlokat és keress rá a `TODO`, `+36300000000`,
> `info@somodivendeghaz.hu` szövegekre.

---

## A foglalási űrlap és naptár élesítése

Jelenleg mindkettő **demó** módban van:

- **Naptár:** statikus, néhány „foglalt” nappal a működés bemutatására.
  Valódi rendszerhez ajánlott: Lodgify, SuperSaaS, Google Calendar beágyazás,
  vagy egyedi backend. A bekötés helye a `js/main.js`-ben a `data-calendar` blokk.
- **Űrlap:** a „Foglalási kérés elküldése” gomb most JS-es köszönő üzenetet ad.
  Valódi email-küldéshez a legegyszerűbb a **Formspree** (ingyenes):
  1. Regisztrálj a formspree.io-n, hozz létre egy űrlapot.
  2. A `kapcsolat.html`-ben az űrlap `action="#"` helyére írd a Formspree URL-t,
     és vedd ki a `data-form` attribútumot (vagy hagyd meg a JS-visszajelzéshez).

Az űrlap mezői a brief szerint: **Vezetéknév, Keresztnév, Email, Felnőttek száma,
Gyerekek száma** (+ egy kiválasztott időpont mező, amit a naptár tölt ki).

---

## Dizájn / testreszabás

Minden szín, betűtípus és térköz a `css/style.css` tetején, a `:root` blokkban
egy helyen állítható (CSS változók). Pl. az arany accent: `--color-gold`.

- **Betűtípusok:** Cormorant Garamond (címek, elegáns serif) + Jost (törzsszöveg).
  Google Fonts-ról töltődnek; internetkapcsolat kell hozzájuk (vagy letölthetők lokálisra).
- **Animációk:** finom scroll-megjelenés, hover-effektek. A `prefers-reduced-motion`
  beállítást tiszteletben tartja (akadálymentesség).

## Technikai jellemzők

- Reszponzív (mobil-first), mobil hamburger menü
- SEO: egyedi `<title>`, meta description, Open Graph, `lang="hu"`
- Schema.org strukturált adat (LodgingBusiness) a fő- és kapcsolat oldalon
- Akadálymentesség: skip-link, ARIA-címkék, billentyűzet-kezelés a lightboxban
- Nincs külső JS-függőség, nincs nyomkövető beépítve
