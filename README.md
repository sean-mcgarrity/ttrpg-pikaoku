# Sean Run's Games
This is a webapp that helps me run my Tabletop Role-Playing Games (TTRPGS) like Dungeons & Dragons (D&D) and Pathfinder 2e (pf2e). I built it using a Typescript Sveltekit frontend using TailwindCSS & Tanstack Query, interacting with a Supabase backend for auth and storage via PostgresDB. The Svelte app is hosted via Vercel and pushes to build on changes to the `main` branch. 

It includes some features that were fun to implement such as full auth via [Supabase and Svelte hooks](src/hooks.server.ts), RLS on the database, a custom [invites system](src/routes/(public)/invite/+page.svelte) and an [admin section with user and feature flag management](src/routes/(app)/campaigns/[campaignId]/edit/+page.svelte).

The main goal was to automate some complicated [game mechanics](src/routes/(app)/campaigns/[campaignId]/monster-parts/item/[itemId]/+page.svelte) for a supplement to the game, including the [database queries](src/lib/persistance/monster-parts.ts) and [logic](src/lib/systems/pf2e_monster_parts.ts) required.

## Database structure

The DB is Postgres hosted by Supabase, using Row Level Security (RLS) on every table/operation. There are custom database functions defined to allow me to authenticate a user by `is_admin` || `user_is_in_campaign`. Triggers are used to created a `profile` row in the public schema when a `user` is created in the auth schema, and to automate clean up of some of the game-spefici content on delete. Some of the game logic is represented in views to simplify querying.

Supabase also allows for exporting your schema as [Typescript types](types/database/index.ts), so I have a [github action](.github/workflows/update-types.yml) set up to allow for quickly generating those types into the frontend. 

![supabase-schema-olzutuliykdpdtmknhxx (1)](https://github.com/user-attachments/assets/d4bca49d-596e-42ac-b803-dc826488940f)

## Some screenshots
The main page for a campaign with links to the various tools available for it. 
<div style="display:flex;">
  <img width="380" alt="Screenshot 2025-03-11 at 22 44 37" src="https://github.com/user-attachments/assets/28d62599-f03d-4556-929d-7ba8f27da916" />
  <img width="380" alt="Screenshot 2025-03-11 at 22 46 23" src="https://github.com/user-attachments/assets/fe3f1d98-f5f5-40fc-9ca1-b57f0d3c0e5d" />
</div>
<br />
<br />

The core mechanic, automating the math and tracking of the player's items and the monster's they has slain and could use to upgrade items. The system would filter the options displayed to a user so they didn't have to manually check nitty-grtty details about a monster to know if they could use it to upgrade their items. 
<div style="display:flex;">
  <img width="380" alt="Screenshot 2025-03-11 at 23 03 52" src="https://github.com/user-attachments/assets/b09466b4-37d7-48d4-83f8-dc3803501313" />
<img width="380" alt="Screenshot 2025-03-11 at 22 49 40" src="https://github.com/user-attachments/assets/1e88755b-ce23-4968-8d9a-816d10dda10a" />
</div>
<br />
<br />

I built a mini-forum into the site so that users could leave notes about quests they had outstanding and communication about how they wanted to prioritize their outstanding options.
<div style="display:flex;">
  <img width="380" alt="Screenshot 2025-03-11 at 22 54 01" src="https://github.com/user-attachments/assets/4ab5fd31-00c5-463c-ad9a-846fd5d40ce1" />
  <img width="380" alt="Screenshot 2025-03-11 at 22 54 10" src="https://github.com/user-attachments/assets/220e384b-da59-4bb7-86f1-7a1dbf0121d4" />

</div>
