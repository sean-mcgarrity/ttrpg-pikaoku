<script lang="ts">
  import type { Row } from 'src/app';
  import { Avatar } from "bits-ui";


  export let profile: Pick<Row<'profile'>, 'avatar_src' | 'username'>;

  $: src = profile.avatar_src || '/avatar-1.png';
  $: initialLetter = profile.username[0].toUpperCase();
</script>

<Avatar.Root
  class="h-12 w-12 rounded-full border {loadingStatus === 'loaded'
    ? 'border-foreground'
    : 'border-transparent'} bg-muted text-[17px] font-medium uppercase text-muted-foreground"
>
  <div
    class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
  >
    <Avatar.Image {src} alt={profile.username} />
    <Avatar.Fallback class="border border-muted">HB</Avatar.Fallback>
  </div>
</Avatar.Root>