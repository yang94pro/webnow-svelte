<script>
	
	import { onMount } from 'svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import Linkpreview from './components/Linkpreview.svelte'
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

	const serveradd = "https://webchay.herokuapp.com"
	// const serveradd = "http://127.0.0.1:5000"
	import io from 'socket.io-client';
	const socket = io(serveradd);

	beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);});

	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0,div.scrollHeight);
	});

	function dateformat(){
		let now = new Date();
		const offsetMs = now.getTimezoneOffset() * 60 * 1000;
		const dateLocal = new Date(now.getTime() - offsetMs);
		let str =dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
		return str;
	};

	function handleKeydown() {

		if (event.which === 13 || event.type === "click") {

			const text = input.value;
			if (!text) return;
			
			socket.emit('chat message', {
				"author": name, 
				"commend": text, 
				"time": dateformat(),
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
					time: result.time,
					type: result.type,
					title: result.title,
					description: result.description,
					image: result.image


				});

		});

	});
	
	
	socket.on('chat message', function (json) {
		json = JSON.parse(json);
		
        comments = comments.concat({
				author: json.author,
				text: json.commend,
				time: json.time,
				type: json.type,
				title: json.title,
				description: json.description,
				image: json.image

			});
		

      });

</script>

<main>
<div class="title"> <h1>Hello {name} !</h1></div>
<div class="side_note">
	<p>* Please insert your name as your username</p>
	<p>* This is an open chat</p>
	<p>* Chat responsibly and be considerate</p>
</div>

<div class="headdiv">
	<label><h2>Name:</h2> </label>
	<input type="text" bind:value={name} class="user_input"/>
</div>

<div class="chat">
	<div class="scrollable" bind:this={div}>
		{#each comments as comment, i}
			{#if comment.author==="system"}
				<span class="systemsg">{comment.text}</span>
			{:else}
				{#if comment.author != name}{#if i!=0 && comment.author != comments[i-1].author} 
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
	<input bind:this={input} on:keydown={handleKeydown}/> <button  type="submit" on:click={handleKeydown}>Send</button>
</div>
	
	

</main>

<style>

	main{
		display: grid;
		justify-items: center;
		height: 95vh;
		width: 95vw;
		margin:auto;
		padding:auto;	

	}
	.side_note{
	
		margin:0;
		position: relative;
		padding: 0;
		display: block;
		height: 60px;
		

	}
	.side_note > p{
	
		padding:0;
		margin:0;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2.7em;
		font-weight: bold;
		text-align: center;

		word-wrap: break-word;
		
	}
	.title{
		margin:auto;
	}
	.title > h1{
		
		align-content: center;
		width: 80vw;
		max-width: 450px;
		position: relative;
	}

	
	.systemsg{
		text-align: center;
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		font-size: 20px;
		color: rgb(151, 151, 151);
	}
	.headdiv{
		position: relative;
		display: inline-flex;
		justify-content: space-around;
		height: 50px;
		align-items: center;
		
	}

	.headdiv label {
		padding:1em;
		position: relative;

	}


	.chat {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 60vh;
		max-height: 600px;
		max-width: 450px;
		width:90%;
		justify-content: center;
		word-wrap: break-word;
		
		
		
	}

	.scrollable {
		flex: 1 1 auto;
		border-top: 1px solid #eee;
		margin: 0 0 0.5em 0;
		overflow-y: auto;
		word-wrap: break-word;
		font-size: 1.1em;
		position: relative;
		
	}

	article {
		margin: 0 0 0.3em 0;
		position: relative;
	
	}
	#commentdate{
		display: none;
		transition: all 5s ease-out;
		-webkit-transition: all 5s ease-in-out;
		margin: 0 5px 0 ;

	}
	.nothing{

		opacity: 0;
		top:0;
		left:0;
		width:100%;
		position: absolute;
	
		-webkit-user-select: all;  /* Chrome all / Safari all */
		-moz-user-select: all;     /* Firefox all */
		-ms-user-select: all;      /* IE 10+ */
 		user-select: all; 
	}


	.nothing:focus + div#commentdate{
		display:block;
		color: dimgrey;

	}

	.user {
		text-align: right;
	}

	span {
		padding: 0.5em 1em;
		display: inline-block;
	
	}

	.other span {
		background-color: #eee;
		border-radius: 1em 1em 1em 0;
		max-width: 250px;
		word-wrap: break-word;
		color:#5D6D7E  ;
		
	}

	.user span {
		background-color: #0074D9;
		color: white;
		border-radius: 1em 1em 0 1em;
		text-align: left;
		max-width: 250px;
		word-wrap: break-word;

	}
	.otherusert {
		
		margin:0.5em 0 0.3em 0.5em;
		color: #34495E ;
		font-weight: bold;
		max-width: 200px;
	}

	.user input.nothing{
		opacity: 0;
		top:0;
		right:0;
		width: 100%;
		float:right;
		position: absolute;

		
	}
	

	@media only screen and (max-width: 500px) {
		.headdiv{
			max-height: 100px;
		}
		.title >h1{
			width: 80vw;
			align-content: center;
		}
	}
</style>

