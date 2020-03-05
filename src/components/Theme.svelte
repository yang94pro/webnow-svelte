<script>
    import Dialog , {Title, Content, Actions} from '@smui/dialog';
    import Button, {Label} from '@smui/button';
    import List, {Item, Graphic, Text} from '@smui/list';
    import Radio from '@smui/radio';
    $: selection= userprefer() ;
    $: addUserprefer(selection);
    function userprefer(){
        if (document.cookie){
			      var cookieTheme = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            console.log(cookieTheme);
            chgtheme(cookieTheme);
			return cookieTheme
		}else{
			return ''
    }};

    function addUserprefer(item){
		document.cookie = "theme="+item
    };
    
    function chgtheme(color){
        let  root = document.documentElement;
        function theme(property , val){
            root.style.setProperty(property , val);
        }
        if(color ==='light'){
            theme("--default-bg-color","white");
            theme("--default-text-color"," #5D6D7E");
            theme("--default-user-color"," #5D6D7E");
            theme("--default-span-color","#0074D9");
            
        }else if (color === 'dark'){
            theme("--default-bg-color","#5D6D7E");
            theme("--default-text-color","#c2c2c2");
            theme("--default-span-color","#283747");
        }else if (color === 'pink'){
            theme("--default-bg-color","	#FFB6C1");
            		
            theme("--default-span-color","#e65f5f");
            theme("--default-text-color"," white");
            theme("--default-othertext-color","#5D6D7E");
            theme("--default-user-color"," white");
            theme("--default-otherspan-color","#eee");
        }
        
    }


    function selectionCloseHandler(e) {
    if (e.detail.action === 'accept') {
        selected = selection;
        chgtheme(selected);
        }
    
    };

    let listSelectionDialog;
    let selection ;
    let selected;

</script>

 <div>
    

    <Dialog 
    bind:this={listSelectionDialog}
    aria-labelledby="list-selection-title" 
    aria-describedby="list-selection-content" 
    on:MDCDialog:closed={selectionCloseHandler}>

      <Title id="list-selection-title">Theme</Title>
      <Content id="list-selection-content">
        <List radioList>
          <Item >
            <Graphic>
              <Radio bind:group={selection} value="dark" />
            </Graphic>
            <Text>Dark</Text>
          </Item>
          <Item>
            <Graphic>
              <Radio bind:group={selection} value="light" />
            </Graphic>
            <Text>Light</Text>
          </Item>
          <Item>
            <Graphic>
              <Radio bind:group={selection} value="pink" />
            </Graphic>
            <Text>Pink</Text>
          </Item>
        </List>
      </Content>
      <Actions>
        <Button>
          <Label>Cancel</Label>
        </Button>
        <Button action="accept">
          <Label>Accept</Label>
        </Button>
      </Actions>
    </Dialog>

    <Button on:click={() => listSelectionDialog.open()}><h4>Theme</h4></Button>
  </div>

<style>
    h4{
        color:var(--default-text-color);
        margin: 0;
        font-weight: 500;
        color: var(--default-text-color);
        letter-spacing: .08929em;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.1em
            

    }

</style>
