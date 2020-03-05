<script>
	
	import { onMount } from 'svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import Linkpreview from './components/Linkpreview.svelte'
	import Theme from './components/Theme.svelte'

	let name;
	$: name = asda()
	$: addCookie(name)
	function asda(){
		if (document.cookie){
			var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			console.log(cookieValue);
			return cookieValue
		}else{
			return 'Guest'
	}};
	
	function addCookie(item){
		document.cookie = "username="+item
	};

	var currentuser;
	let div;
	let autoscroll;
	let input;

	// const serveradd = "https://webchay.herokuapp.com";
	const serveradd = "http://127.0.0.1:5000";
	import io from 'socket.io-client';
	const socket = io(serveradd);

	beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);});

	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0,(div.scrollHeight));
	});

	function dateformat(date){

		
		let now = new Date(date);
		console.log(date, now.getTime())
		const offsetMs = now.getTimezoneOffset() * 60 * 1000;
		var dateLocal = new Date(now.getTime() - offsetMs);
		let str =((dateLocal.toString().slice(0,25)))
		
		
		return str
	};

	function handleKeydown() {

		if (event.which === 13 || event.type === "click") {

			const text = input.value;
			if (!text) return;
			
			socket.emit('chat message', {
				"author": name, 
				"commend": text, 
				"clienttime": dateformat(Date()),
			});
			
			console.log(comments);
			input.value = '';
		};
	};
	
	var formdata = new FormData();
	var requestOptions = {
		method: 'GET',
		redirect: 'follow',
		
		};
	let comments=[];
	onMount(async() => { 
	
		
		const res = await fetch(serveradd+"/api/chat", requestOptions);
		let results = await res.json();
		await results.reverse().forEach(result => {
			comments = comments.concat({
					author: result.author,
					text: result.commend,
					time: dateformat(result.time),
					type: result.type,
					title: result.title,
					description: result.description,
					image: result.image


				});

		});

	});
	
	
	socket.on('chat message', function (json) {
		json = JSON.parse(json);
		console.log(json)
        comments = comments.concat({
				author: json.author,
				text: json.commend,
				time: dateformat(json.time),
				type: json.type,
				title: json.title,
				description: json.description,
				image: json.image

			});
		

	  });
	  
	  function setupTypewriter(t) {
        var HTML = t.innerHTML;

        t.innerHTML = "";

        var cursorPosition = 0,
            tag = "",
            writingTag = true,
            tagOpen = true,
            typeSpeed = 10,
        	tempTypeSpeed = 0;

        var type = function() {
        
            if (writingTag === true) {
                tag += HTML[cursorPosition];
            }

            if (HTML[cursorPosition] === "<") {
                tempTypeSpeed = 0;
                if (tagOpen) {
                    tagOpen = false;
                    writingTag = true;
                } else {
                    tag = "";
                    tagOpen = true;
                    writingTag = true;
                    tag += HTML[cursorPosition];
                }
            }
            if (!writingTag && tagOpen) {
                tag.innerHTML += HTML[cursorPosition];
            }
            if (!writingTag && !tagOpen) {
                if (HTML[cursorPosition] === " ") {
                    tempTypeSpeed = 0;
                }
                else {
                    tempTypeSpeed = (Math.random() * typeSpeed) + 50;
                }
                t.innerHTML += HTML[cursorPosition];
            }
            if (writingTag === true && HTML[cursorPosition] === ">") {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
                writingTag = false;
                if (tagOpen) {
                    var newSpan = document.createElement("span");
                    t.appendChild(newSpan);
					newSpan.innerHTML = tag;
					
					tag = newSpan.firstChild;
					tag.style.margin = 0;
					tag.style.color = "var(--default-text-color)";
					tag.style.letterSpacing= "1px";
					tag.style.alignItems = "center";
					
                }
            }

            cursorPosition += 1;
            if (cursorPosition < HTML.length - 1) {
                setTimeout(type, tempTypeSpeed);
            }

        };

        return {
            type: type
        };
    }
	
	window.onload = ()=> {
		var tyy = document.getElementById('typewriter');
		var typewriter = setupTypewriter(tyy);
		typewriter.type();
		window.addEventListener('resize',function(){
			console.log(window.innerHeight);
			if (window.innerHeight < 680){
				tyy.style.height="0";
				
				document.getElementById("msg-input").style.marginBottom="5px";
				div.scrollTo(0,div.scrollHeight)
			} else{
				tyy.style.height ="70px";
				document.getElementById("chat").style.height = "70vh";
				document.getElementById("msg-input").style.marginBottom="15px";	
			}
		});

	};
	

   
</script>
<svelte:head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-158899098-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-158899098-1');
</script>

<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</svelte:head>
<main>
<div class="title"> <h1>Hello {name} !</h1></div>
<div id ="typewriter">
<div class="side_note">
	<p>* Please insert your name as your username</p>
	<p>* This is an open chat</p>
	<p>* AI bot in trainning. Currently offline.</p>
</div></div>

<div class="headdiv">
	<center><label><h4>Name:</h4> </label></center>
	<input type="text" bind:value={name} class="user_input"/>
	<div class="theme"><Theme/>
	</div>
	
</div>

<div class="chat" id="chat">
	<div class="scrollable" bind:this={div}>
		{#each comments as comment, i}
			{#if comment.author==="system"}
				<span class="systemsg">{comment.text}</span>
			{:else}
				{#if i!=0 && comment.author != comments[i-1].author} 
					{#if comment.type ==="bot"}
						<p class="bot_respond">{comment.author}:</p>
					{:else if comment.author != name}
						<p class='otherusert'>{comment.author}:</p>
					
					{/if}
				{/if}
				<article class="{comment.author=== name? "user":"other"}">
					{#if comment.type ==="link"}
						<span>
						<Linkpreview 
							title={comment.title} 
							image={comment.image}
							description={comment.description}
							url={comment.text}/>
																		
						</span>
					
					{:else}
						<span>{comment.text}</span>
						
					{/if}<input class="nothing" type="button">
					<div id="commentdate">
						{comment.time}
					</div>
				</article>
			{/if}
		{:else}

			<!-- this block renders when photos.length === 0 -->
			 <center><p>Comments are loading...</p></center>
		{/each}
	</div>
	<div class = "msg-input" id='msg-input'>
		<input bind:this={input} on:keydown={handleKeydown} />
		<button  type="submit" on:click={handleKeydown}>Send</button>

	</div>
</div>
	

</main>

<style>
	:global(:root){
		--default-bg-color: 'white';
		--default-span-color: #0074D9;
		--default-text-color: #5D6D7E;
		--default-othertext-color:#5D6D7E;
		--default-usertext-color: white;
		--default-user-color: #5D6D7E;
		--default-otherspan-color:  #eee ;
	}
	:global(body){
		margin:0;
		padding:0;
		background:var(--default-bg-color);
		height:100%;
		overflow: hidden;
		scroll-behavior: none;
		align-items: center;
	}
	input{
		background:none;
		position: relative;
		color: var(--default-text-color);
		margin:0;
		font-size: 1.1em;
	}
	p{
		color: var(--default-text-color)
	}
	
	main{
		display: grid;
		justify-items: center;
		height: 100%;
		width: 98vw;
		margin:auto;
		padding:auto;	
		background:var(--default-bg-color);
		font-family: 'Roboto';
		align-content: center;



	}
	.side_note{
	
		margin:0;
		position: relative;
		padding: 0;
		display: block;
		height: 60px;
		

	}
	#typewriter{
		margin: auto;
		overflow: hidden;
		padding:0;	
		align-self: center;
		height: 70px;


		
	}
	.side_note  p{
		color: var(--default-text-color);
		padding:0;
		margin:0;
	}
	
	
	h1 {
		color: var(--default-text-color);
		text-transform: uppercase;
		font-size: 2.7em;
		font-weight: bolder;
		text-align: center;
		text-shadow:1px 1px rgb(55, 66, 78);
		margin: 0.3em auto;
		word-wrap: break-word;
		
		
	}

	.title > h1{
		
		align-content: center;
		width: 80vw;
		max-width: 450px;
		position: relative;
	}

	.user_input{
		background:none;
		border: 2px solid var(--default-text-color);
		color: var(--default-text-color);
		margin:0;
	}
	.systemsg{
		text-align: center;
		display: flex;
		flex-direction: column;
		margin: 0;
		margin-top:0.2em;
		padding: 0;
		font-size: 0.9em;
		color: rgb(151, 151, 151);
	}
	.headdiv{
		position: relative;
		display: inline-flex;
		justify-content: space-around;
		margin-bottom: 10px;
		align-items: center;
		width: 100%;
		max-width: 350px
		
		
	}

	.headdiv label {
		padding: 0 0.3em 0 0;
		position: relative;
		color: var(--default-text-color);
		margin: 0;
		float: left;
		

	}

	.headdiv label>h4{
		padding:0;
		margin:0;
		
		color: var(--default-text-color);
		letter-spacing: .08929em;
		text-transform: uppercase;
		font-weight:600;
		font-size: 1em

		
	}

	.chat {
		position: relative;
		display: flex;
		flex-direction: column;
		height:70vh;
		
		margin: 0;
		max-width: 450px;
		width:95%;
		justify-content: center;
		word-wrap: break-word;

		
		
		
	}

	.scrollable {
		flex: 1 1 auto;
		border-top: 1px solid #eee;
		margin: 0;
		overflow-y: auto;
		word-wrap: break-word;
		font-size: 1em;
		position: relative;
		margin-bottom: 10px;
		
		overscroll-behavior: contain;
		
	}

	article {
		margin: 0 0 0.2em 0;
		position: relative;
		
	
	}
	#commentdate{
		height:0;
		overflow: hidden;
		font-size: 0.8em;
		transition: all 0.4s ease-out;
		-webkit-transition: all 0.4s ease-in-out;
		margin: 0 5px 0 ;

	}
	.nothing{

		opacity: 0;
		top:0;
		left:0;
		width:100%;
		height:100%;
		position: absolute;
	
		-webkit-user-select: text;  /* Chrome all / Safari all */
		-moz-user-select: text;     /* Firefox all */
		-ms-user-select: text;      /* IE 10+ */
 		user-select: text; 
	}


	.nothing:focus + div#commentdate{
		display:block;
		height: 1em;
		color: dimgrey;

	}

	.user {
		text-align: right;
	}

	span {
		padding: 0.4em 1em;
		display: inline-block;

	}

	.other span {
		background-color: var(--default-otherspan-color);
		border-radius: 1em 1em 1em 0;
		max-width: 70%;
		
		word-wrap: break-word;
		color:var(--default-othertext-color);
		
	}
	::-webkit-scrollbar{
		width: 2px;
		
		
	}

	.user span {
		background-color: var(--default-span-color);
		color:var(--default-usertext-color);
		border-radius: 1em 1em 0 1em;
		text-align: left;
		max-width: 70%;
		word-wrap: break-word;

	}
	.otherusert {
		
		margin:0.1em 0 0.1em 0.5em;
		color: var(--default-text-color) ;
		font-weight: bold;
		max-width: 200px;
	}
	.bot_respond{
		margin:0.5em 0 0.1em 0.5em;
		
		font-weight: bold;
		max-width: 200px;
		color: red
	}

	.user input.nothing{
		opacity: 0;
		top:0;
		right:0;
		width: 100%;
		float:right;
		position: absolute;

		
	}
	button{
		position: relative;
		float: right;
		width: 20%;
		margin:0;
		background: none;
		cursor: pointer;
		display: block;
		font-weight: 500;
		color: var(--default-text-color);
		letter-spacing: .08929em;
		text-transform: uppercase;
		font-weight: bold;
		border: none;
		font-size: 1.1em;
		padding-right:0;


	}
	.msg-input{
		border: 2px solid var(--default-text-color);
		bottom: 5px;
		max-width: 446px;
		height: 40px;
		justify-items: space-around;
		position: relative;
		border-radius: 10px;
	}
	.msg-input > input{
		position: absolute;
		width: 80%;
		border: none;
		align-content: center;
		outline: none;
		
		
	}
	.user_input{
		width: 200px;
		border-radius: 10px;
		height: 35px;

	}

	@media only screen and (max-width: 500px) {
		.headdiv{
			max-height: 50px;
		}
	
		.title >h1{
			width: 80vw;
			align-content: center;
		}
		.scrollable{
			font-size: 0.95em;
		}
	}
</style>

