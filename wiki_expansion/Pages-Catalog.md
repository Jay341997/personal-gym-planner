# Pages Catalog

## Summary

`src/pages/` is the largest product surface in the repository. It contains route-backed modules for user journeys, content publishing, account management, and campaign pages.

## Main page groups

- Discovery and browsing: `Home`, `Search`, `PropertyPage`, `List`, `UniversityPage`, `BaiduHome`, `WhitelabelHome`
- Conversion and booking: `BookForm`, `ApplicationForm`, `Payment`, `BookingDetails`, `Bookings`, `CashbackSupport`
- Account and retention: `Profile`, `Shortlist`, `Offers`, `Activity`, `Settings`, `AppSettings`, `ProfileRefer`
- Brand and acquisition: `About`, `Ambassador`, `Referral`, `Scholarship`, `AmberApp`, `Career`, `Jobs`
- Policy and informational: `Privacy`, `Terms`, `ThirdPartyInfo`, `PersonalInfoSharingList`, `AmberUserServiceAgreement`, `Support`
- Content systems: `Blog`, `News`, `Podcast`, `Exams`, `MediaMentions`
- Product extensions: `AmberPlus`, `PlusCategories`, `UniKit`

## Structure patterns

- Many pages have `Desktop/` variants alongside shared or mobile implementations.
- Large page areas often include `components/`, `data/`, `helpers/`, `hooks/`, and `Desktop/` folders.
- Some content domains such as blog, news, podcast, and exams have home, grid, and post submodules.

## Priority reading targets

- `PropertyPage` and `Search` for discovery funnel behavior
- `BookForm`, `ApplicationForm`, and `Payment` for conversion flow behavior
- `Profile` and `Bookings` for logged-in user behavior
- `Blog`, `News`, and `Exams` for content publishing patterns

## Evidence

- Code: src/pages/
- Code: src/routes/index.ts
- Code: src/routes/desktop/index.ts

## Related pages

- [Codebase Map](./Codebase-Map.md)
- [Routes and Areas](./Routes-and-Areas.md)
- [Shared Components](./Shared-Components.md)
