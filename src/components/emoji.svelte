<script>
  import temoji from "./data1";
  // import datas from './emojidata';
  // import twemoji from './twemoji.min';
  import Emojitab from "./emojitab.svelte";
  import Tab, { Icon, Label } from "@smui/tab";
  import TabBar from "@smui/tab-bar";
  import Button from "@smui/button";
  import Menu, { SelectionGroup, SelectionGroupIcon } from "@smui/menu";
  import { Anchor } from "@smui/menu-surface";
  import List, {
	Item,
	Separator,
	Text,
	PrimaryText,
	SecondaryText,
	Graphic
  } from "@smui/list";
  import {createEventDispatcher} from 'svelte';
  let dispatch = createEventDispatcher();

  // let temoji =[];

  // datas.forEach( data=> {
  //     temoji = temoji.concat({
  //         code: twemoji.parse(twemoji.convert.fromCodePoint(data.codes)),
  //         group: data.group,
  //     })

  // });

//   window.onload= () =>{
//     const _C = document.querySelector('.divasd'),
//       N = 4, NF = 30,
// 			TFN = {
// 				/* can remove these if not used
// 				'linear': function(k) { return k },
// 				'ease-in': function(k, e = 1.675) {
// 					return Math.pow(k, e)
// 				},
// 				'ease-out': function(k, e = 1.675) {
// 					return 1 - Math.pow(1 - k, e)
// 				},
// 				'ease-in-out': function(k) {
// 					return .5*(Math.sin((k - .5)*Math.PI) + 1)
// 				}, */
// 				'bounce-out': function(k, a = 2.75, b = 1.5) {
// 					return 1 - Math.pow(1 - k, a)*Math.abs(Math.cos(Math.pow(k, b)*(n + .5)*Math.PI))
// 				}
// 			};

// let i = 0, x0 = null, locked = false, w, ini, fin, rID = null, anf, n;

// function stopAni() {
//   cancelAnimationFrame(rID);
//   rID = null
// };

// function ani(cf = 0) {
//   _C.style.setProperty('--i', ini + (fin - ini)*TFN['bounce-out'](cf/anf));

//   if(cf === anf) {
//     stopAni();
//     return
//   }

//   rID = requestAnimationFrame(ani.bind(this, ++cf))
// };

// function unify(e) {	return e.changedTouches ? e.changedTouches[0] : e };

// function lock(e) {
//   x0 = unify(e).clientX;
// 	locked = true
// };

// function drag(e) {
//   e.preventDefault();

//   if(locked) {
//     let dx = unify(e).clientX - x0, f = +(dx/w).toFixed(2);

//     _C.style.setProperty('--i', i - f)
//   }
// };

// function move(e) {
//   if(locked) {
//     let dx = unify(e).clientX - x0,
//         s = Math.sign(dx),
//         f = +(s*dx/w).toFixed(2);

//     ini = i - s*f;

//     if((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
//       i -= s;
//       f = 1 - f
//     }

//     fin = i;
// 		anf = Math.round(f*NF);
// 		n = 2 + Math.round(f)
//     ani();
//     x0 = null;
//     locked = false;
//   }
// };



// addEventListener('resize', size, false);

// _C.addEventListener('mousedown', lock, false);
// _C.addEventListener('touchstart', lock, false);

// _C.addEventListener('mousemove', drag, false);
// _C.addEventListener('touchmove', drag, false);

// _C.addEventListener('mouseup', move, false);
// _C.addEventListener('touchend', move, false);
//   };
  export let anchor;
  let menu2;

  let keyedTabs = [
	{
	  k: "Smileys & Emotion",
	  icon: "c1",
	  label: "Code"
	},
	{
	  k: "People & Body",
	  icon: "c2",
	  label: "Code"
	},
	{
	  k: "Animals & Nature",
	  icon: "c3",
	  label: "Code"
	},
	{
	  k: "Travel & Places",
	  icon: "c4",
	  label: "Code"
	},
	{
	  k: "delete",
	  icon: 'Delete'

	}
  ];
  let keyedTabsActive = keyedTabs[0];
  $: Filterlist = temoji.filter(t => t.group === keyedTabsActive.k );
</script>

<style>

</style>

<Button on:click={() => {menu2.setOpen(true); dispatch("windowrz",{detail:"sdsf"}); console.log('sdfs');}}>
  <img src="/icons8-batman-emoji-30.png" alt="Emoji" />
</Button>
<Menu
  bind:this={menu2}
  anchor={true}
  bind:anchorElement={anchor}
  anchorCorner="BOTTOM_END">

  <!-- <pre class="status">Selected: {keyedTabsActive.icon}</pre> -->
  <TabBar
	tabs={keyedTabs}
	let:tab
	key={tab => tab.k}
	bind:active={keyedTabsActive}>
	<Tab
	  {tab}
	  stacked={false}
	  indicatorSpanOnlyContent={false}
	  tabIndicator$transition="slide">
	  <Icon class="material-icons">{tab.icon}</Icon>

	</Tab>

  </TabBar>

	  <List> <div class='divasd'>
	  <Emojitab emoji={Filterlist} on:emojiClicked /></div>
	</List>


</Menu>

<!-- <Emojitab emoji={keyedTabsActive.k}/> -->

<!-- <Item on:SMUI:action={() => clicked = 'Cut'}>
			<Text>
			  <PrimaryText>Cut</PrimaryText>
			  <SecondaryText>Copy to clipboard and remove.</SecondaryText>
			</Text>
		  </Item>
		  <Item on:SMUI:action={() => clicked = 'Copy'}>
			<Text>
			  <PrimaryText>Copy</PrimaryText>
			  <SecondaryText>Copy to clipboard.</SecondaryText>
			</Text>
		  </Item>
		  <Item on:SMUI:action={() => clicked = 'Paste'}>
			<Text>
			  <PrimaryText>Paste</PrimaryText>
			  <SecondaryText>Paste from clipboard.</SecondaryText>
			</Text>
		  </Item>
		  <Separator />
		  <Item on:SMUI:action={() => clicked = 'Delete'}>
			<Text>
			  <PrimaryText>Delete</PrimaryText>
			  <SecondaryText>Remove item.</SecondaryText>
			</Text>
		  </Item> -->
