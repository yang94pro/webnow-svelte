<script>
	
	import { onMount } from 'svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';

	let name;
	let currentuser = name;
	let div;
	let autoscroll;
	let input;
	const serveradd = "https://webchay.herokuapp.com"

	import io from 'socket.io-client';
	const socket = io(serveradd);


	
	beforeUpdate(() => {
		autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
	});

	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0, div.scrollHeight);
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
					time: result.time

				});

		});

	});
	
	
	
	socket.on('chat message', function (json) {
		json = JSON.parse(json);
		
        comments = comments.concat({
				author: json.author,
				text: json.commend,
				time: json.time
			});
		

      });


</script>

<main>
<div class="title"> <h1>Hello {name} !</h1></div>
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
					<span>{comment.text}</span>
					<input class="nothing" type="button">
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
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2.5em;
		font-weight: bold;
		text-align: center;

		word-wrap: break-word;
		
	}
	.title{
		width: 50vw;
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

		display: flex;
		justify-content: space-around;
		height: 50px;
		margin: auto;
		max-width: 100px;
		align-items: center;
	
		
	}

	.headdiv label {
		padding:1em;
		

	}


	.chat {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 50vh;
		max-height: 600px;
		max-width: 440px;
		width:80%;
		justify-content: center;
		word-wrap: break-word;
		
		
		
	}

	.scrollable {
		flex: 1 1 auto;
		border-top: 1px solid #eee;
		margin: 0 0 0.5em 0;
		overflow-y: auto;
		word-wrap: break-word;
		font-size: 1em;
		
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
		cursor: pointer;
		transition: all 5s ease-out; 
		-webkit-transition: all 5s ease-in-out;
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
	}

	.user input.nothing{
		opacity: 0;
		top:0;
		right:0;
		width: 100%;
		float:right;
		position: absolute;
		cursor: pointer;
		
	}
	

	@media only screen and (max-width: 400px) {
		.headdiv{
			max-height: 100px;
		}
	}
</style>

