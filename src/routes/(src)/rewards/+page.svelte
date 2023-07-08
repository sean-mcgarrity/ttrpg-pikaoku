<script lang="ts">
  import { onMount } from 'svelte';
  import { db } from '../../../utils/firebase';
  import { collection, query, getDocs } from 'firebase/firestore';
  import { writable } from 'svelte/store';

  const rewardStore = writable([]);

  onMount(async () => {
    const q = query(collection(db, 'sites', 'otari', 'campaigns'));
    const snapshot = await getDocs(q);
    let rewards = [];
    snapshot.forEach((doc) => {
      rewards.push({id: doc.id, ...doc.data()});
      console.log(doc.id, ' => ', doc.data());
    });
    rewardStore.set(rewards);
  });
</script>

<div>
  <h1>Campaign Rewards</h1>
  {#each $rewardStore as reward}
    <a href="/rewards/{reward.id}">
    <div class="flex flex-row p-6 bg-slate-600 gap-8 rounded">
      <h2 class="font-bold">{reward.name}</h2>
    </div>
    </a>
  {/each}
</div>
