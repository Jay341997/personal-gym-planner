# Shared Components

## Summary

`src/components/` contains the reusable UI layer used across many page modules. It mixes low-level inputs and layout helpers with domain-heavy reusable blocks such as headers, footers, lead forms, search UI, and modals.

## Key facts

- The component library is broad and spans forms, overlays, navigation, content presentation, and localization helpers.
- Shared components likely carry a significant amount of product behavior, not just visual styling.
- Repeated product patterns such as search UI, lead capture, translation, banners, and trust widgets are centralized here.

## Notable component groups

- Navigation and shell: `Header`, `FooterV2`, `FooterWhiteLabel`, `BottomNavBar`, `SectionNavigation`
- Form and input primitives: `Input`, `Radio`, `CheckBox`, `DatePicker`, `RangeSlider`, `LabelledRadioGroup`
- Overlay patterns: `Modal`, `BottomSheetOverlay`, `Portal`, `Tooltip`
- Funnel and conversion UI: `LeadForm`, `LeadFormModal`, `PartnerLeadFormModal`, `LeadFormV2`
- Search and browse UI: `NavSearchInput`, `SearchModalMobile`, `SearchModalDesktop`, `SortOptions`, `Pagination`
- Content and display: `ContentHeroSection`, `ContentGridSection`, `ContentPostLayout`, `VideoPlayer`, `Carousel`
- Utility wrappers: `ErrorBoundary`, `ComponentErrorBoundary`, `ScrollToTop`, `LazyLoadOnScroll`, `ClientOnlyLanguageGuard`

## Implications

- Changes to shared UI can affect multiple page families at once.
- The component directory is a strong candidate for future wiki pages focused on forms, search, and shell UX.

## Evidence

- Code: src/components/

## Related pages

- [Codebase Map](./Codebase-Map.md)
- [Pages Catalog](./Pages-Catalog.md)
- [App Shell](./App-Shell.md)
