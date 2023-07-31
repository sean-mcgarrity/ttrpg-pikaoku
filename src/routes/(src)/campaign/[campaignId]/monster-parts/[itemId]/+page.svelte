<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$src/components/Button.svelte';

  $: itemId = $page.params.itemId;

  const item: MP_Item = {
    id: 'seven',
    name: "Drake's Hide Armor",
    description:
      'A wondrous magical gem that harnesses the essence of time itself. With a mere touch, this small, gleaming stone grants its wielder the ability to manipulate time within a limited sphere.',
    type: 'armor',
    armor: 'Leather',
    refinements: [
      {
        amount: 37,
        description: 'Giant Scropion'
      }
    ]
  };

  // ref: https://d1lss44hh2trtw.cloudfront.net/assets/editorial/2020/07/destiny-2-reverie-dawn-hauberk-armor-stats.jpg

  const itemLevel = 7;
</script>

<div class="flex flex-col md:flex-row w-full gap-8">
  <div class="flex-1 flex flex-col gap-4">
    <div id="overview" class="border-2 border-black/10 shadow overflow-hidden mb-4">
      <div class="bg-[#6666cc] flex flex-row text-white">
        <div class="w-full px-4 py-2">
          <h1 class="text-3xl font-bold tracking-wide uppercase">
            {item.name}
          </h1>
          <div class="font-medium capitalize tracking-wider text-white/80 text-lg">{item.type}</div>
        </div>
        <div class="text-6xl font-extrabold px-4 py-2 bg-black/10 flex">
          <div class="m-auto">{itemLevel}</div>
        </div>
      </div>
      <div class=" bg-[#6666cc]/20 text-white flex-col gap-2">
        <div class="px-4 py-2">
          <div class="flex flex-row gap-4 text-white/80 font-light tracking-wide italic">
            {item.description}
          </div>
          <div class="flex flex-row gap-1 mt-2">
            <div class="">{item.armor}</div>
            <div class="capitalize">{item.type}</div>
            <span>AC 14 + DEX (Max 3)</span>
            <span class="text-white/60 ml-auto">Sell 40GP</span>
          </div>
        </div>
        <div class="border border-white/20 border-solid" />
        <div class="px-4 py-2">
          <div class="flex gap-1 uppercase text-lg tracking-wide">Refinement</div>
          <div class="flex flex-row gap-4 mt-2 mb-4">
            <div>Potent (AC +1)</div>
            <div>Resilient (Saving Throws +1)</div>
          </div>
          <div>
            <div class="relative h-2 w-4/5 rounded-full my-2 mx-auto font-medium">
              <div class="absolute inset-0 bg-black/20" />
              <div class="absolute inset-0 w-4/5 bg-blue-300" />
              <div
                class="absolute bg-white rounded w-4 aspect-square text-xs text-center -left-2 -top-1 rotate-45"
              />
              <div
                class="absolute bg-white rounded w-4 aspect-square text-xs text-center -right-2 -top-1 rotate-45"
              />
              <div class="absolute text-black w-4 aspect-square text-xs text-center -left-2 -top-1">
                {itemLevel - 1}
              </div>
              <div
                class="absolute text-black w-4 aspect-square text-xs text-center -right-2 -top-1"
              >
                {itemLevel + 1}
              </div>
            </div>
          </div>
          <div class="w-full text-center font-bold text-lg">{(180 / 5) * 4} / 180</div>
        </div>
        <div class="border border-white/20 border-solid" />
        <div class="px-4 py-2">
          <div class="flex gap-1 uppercase text-lg tracking-wide">WINGED &#9992;</div>
          <ul class="px-8 list-disc">
            <li>
              The armor casts feather fall on you automatically when you fall, this benefit can’t
              trigger again for 10 minutes
            </li>
            <li>The armor can cast fly on you once per day</li>
          </ul>
          <div class="mt-4">
            <div class="relative h-2 w-11/12 rounded-full my-2 mx-auto font-medium">
              <div class="absolute inset-0 bg-black/20" />
              <div class="absolute inset-0 w-2/5 bg-[#4444aa]" />
              <div
                class="absolute bg-[#6666cc] rounded w-4 aspect-square text-xs text-center -left-2 -top-1 rotate-45"
              />
              <div
                class="absolute bg-white rounded w-4 aspect-square text-xs text-center -right-2 -top-1 rotate-45"
              />
              <div class="absolute text-white w-4 aspect-square text-xs text-center -left-2 -top-1">
                6
              </div>
              <div
                class="absolute bg-[#6666cc] rounded w-4 aspect-square text-xs text-center -top-1 rotate-45"
                style={`left:${(100 / 14) * 2}%`}
              />
              <div
                class="absolute text-white w-4 aspect-square text-xs text-center -top-1"
                style={`left:${(100 / 14) * 2}%`}
              >
                8
              </div>
              <div
                class="absolute bg-[#6666cc] rounded w-4 aspect-square text-xs text-center -top-1 rotate-45"
                style={`left:${(100 / 14) * 4}%`}
              />
              <div
                class="absolute text-white w-4 aspect-square text-xs text-center -top-1"
                style={`left:${(100 / 14) * 4}%`}
              >
                10
              </div>
              <div
                class="absolute bg-white rounded w-4 aspect-square text-xs text-center -top-1 rotate-45"
                style={`left:${(100 / 14) * 8}%`}
              />
              <div
                class="absolute text-black w-4 aspect-square text-xs text-center -top-1"
                style={`left:${(100 / 14) * 8}%`}
              >
                14
              </div>
              <div
                class="absolute bg-white rounded w-4 aspect-square text-xs text-center -top-1 rotate-45"
                style={`left:${(100 / 14) * 10}%`}
              />
              <div
                class="absolute text-black w-4 aspect-square text-xs text-center -top-1"
                style={`left:${(100 / 14) * 10}%`}
              >
                16
              </div>
              <div
                class="absolute bg-white rounded w-4 aspect-square text-xs text-center -top-1 rotate-45"
                style={`left:${(100 / 14) * 12}%`}
              />
              <div
                class="absolute text-black w-4 aspect-square text-xs text-center -top-1"
                style={`left:${(100 / 14) * 12}%`}
              >
                18
              </div>
              <div
                class="absolute text-black w-4 aspect-square text-xs text-center -right-2 -top-1"
              >
                20
              </div>
            </div>
          </div>
          <div class="w-full text-center font-bold text-lg">170 / 220</div>
          <div class="px-8">
            <div><span class="font-medium">level 14:</span></div>
            <div>The armor can cast fly on you once per hour instead of once per day</div>
          </div>
          <div class="text-white/40 mt-2 inline-flex px-6 flex-row mx-auto select-none">
            <div class="rounded hover:bg-white/10 cursor-pointer px-2 py-1 inline-flex">
              <div>See All</div>
              <span class="rotate-90 mx-2">&gt</span>
            </div>
          </div>
        </div>
        <div class="p-2 mt-2 bg-black/20 flex flex-row justify-end gap-2 tracking-wide">
          <Button>Imbue &#8682;</Button>
          <Button>Refine &#9874;</Button>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-1 flex flex-col">
    <div
      class="h-60 mx-auto aspect-square bg-white/5 rounded-lg border-4 border-white border-dashed flex"
    >
      <div class="m-auto text-white">IMAGE</div>
    </div>
  </div>
</div>
