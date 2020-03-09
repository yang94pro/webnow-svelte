<script>
    import temoji from './data1'
    // import datas from './emojidata';
    // import twemoji from './twemoji.min';
    import Emojitab from './emojitab.svelte';
    import Tab, {Icon, Label} from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Button from '@smui/button';
    import Menu, {SelectionGroup, SelectionGroupIcon} from '@smui/menu';
    import {Anchor} from '@smui/menu-surface';
    import List, {Item, Separator, Text, PrimaryText, SecondaryText, Graphic} from '@smui/list';

    // let temoji =[];

    // datas.forEach( data=> {
    //     temoji = temoji.concat({
    //         code: twemoji.parse(twemoji.convert.fromCodePoint(data.codes)),
    //         group: data.group,
    //     })

    // });

    


 
 
    let anchor2;
    let menu2;

      let keyedTabs = [
    {
      k: 'Smileys & Emotion',
      icon: 'c1',
      label: 'Code'
    },
    {
      k: 'People & Body',
      icon: 'c2',
      label: 'Code'
    },
    {
      k: 'Animals & Nature',
      icon: 'c3',
      label: 'Code'
    },
    {
      k: 'Travel & Places',
      icon: 'c4',
      label: 'Code'
    }
  ];
  let keyedTabsActive = keyedTabs[0];
  $: Filterlist = temoji.filter(t => t.group === keyedTabsActive.k)



  
</script>



<div use:Anchor bind:this={anchor2}>
      <Button on:click={() => menu2.setOpen(true)}><img src="/icons8-batman-emoji-30.png" alt='Emoji'></Button>
      <Menu bind:this={menu2} anchor={true} bind:anchorElement={anchor2} anchorCorner="BOTTOM_RIGHT">
        <List>
            <TabBar tabs={keyedTabs} let:tab key={tab => tab.k} bind:active={keyedTabsActive} >
              <Tab {tab} stacked={false} indicatorSpanOnlyContent={false} tabIndicator$transition="fade" >
                <Icon class="material-icons" >{tab.icon}</Icon>

              </Tab>

            </TabBar>
            <!-- <pre class="status">Selected: {keyedTabsActive.icon}</pre> -->
            
            
            <Emojitab emoji={Filterlist} on:emojiClicked/>
            
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
        </List>
      </Menu>
    </div>



<style>


</style>
