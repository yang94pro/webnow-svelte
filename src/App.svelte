<script>
	import { Anchor } from "@smui/menu-surface";
	import { onMount } from "svelte";
	import { beforeUpdate, afterUpdate } from "svelte";
	import Linkpreview from "./components/Linkpreview.svelte";
	import Headdiv from "./components/Headdiv.svelte";

	import Emoji from "./components/emoji.svelte";
	import io from "socket.io-client";
	
	const socket = io(serveradd);
	
	var currentuser;
	let div;
	let autoscroll;
	let input1;
	let anchor2;
	let name;

	$: name = getUsername();
	$: addCookie(name);

	function getUsername() {
		if (document.cookie) {
			var cookieValue = document.cookie.replace(
				/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
				"$1"
			);
			console.log(cookieValue);
			return cookieValue;
		} else {
			return "Guest";
		}
	}

	function addCookie(item) {
		document.cookie = "username=" + item;
	}



	//Server connection
		//for production use:
		const serveradd = "https://webchay.herokuapp.com";
		//for development use:
		// const serveradd = "http://127.0.0.1:5000";


	//Check the div height, autoscroll return true if condition fullfilled
	beforeUpdate(() => {
		autoscroll =
		div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
	});

	//Check the div height to the most bottom
	afterUpdate(() => {
		if (autoscroll) div.scrollTo(0, div.scrollHeight);
	});

	//Changing date-time format and localize timezone
	function dateformat(date) {
		let now = new Date(date);
		const offsetMs = now.getTimezoneOffset() * 60 * 1000;
		var dateLocal = new Date(now.getTime() - offsetMs);
		let str = dateLocal.toString().slice(0, 25);
		return str;
	};

	//Submit message and emit event on websocket
	function handleKeydown() {
		if (event.which === 13 || event.type === "click") {
			event.preventDefault();
			if (!name) {
				alert("Please insert your name");
				return
			};
			const text = input1;
			if (text) return;
			console.log(text);
			socket.emit("chat message", {
				author: name,
				commend: text,
				clienttime: new Date().toLocaleString()
			});
			console.log(comments);	
			input1 = "";
			}
	};

	//sending API request to get chat history
	var formdata = new FormData();
	var requestOptions = {
		method: "GET",
		redirect: "follow"
	};
	let comments = [];
	let uuser =[];
	onMount(async () => {
		const res = await fetch(serveradd + "/api/chat", requestOptions);
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
		
			if (!uuser.includes(result.author)){
				uuser.push(result.author);
			};
		});
	
		console.log(uuser)
  	});

	//receive msg from other user including self
	socket.on("chat message", function(json) {
		json = JSON.parse(json);
		console.log(json);
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

 
	//Append emoji in div contenteditable 
	function alertmsg(event) {
		input1 += event.detail.detail;
		console.log(input1.length);
	};


</script>

<style>
  :global(:root) {
	--default-bg-color: "white";
	--default-span-color: #0074d9;
	--default-text-color: #5d6d7e;
	--default-othertext-color: #5d6d7e;
	--default-usertext-color: white;
	--default-user-color: #5d6d7e;
	--default-otherspan-color: #eee;
  }
  :global(body) {
	margin: 0;
	padding: 0;
	background: var(--default-bg-color);
	height: 100%;

	align-items: center;
  }
  input {
	background: none;
	position: relative;
	color: var(--default-text-color);
	margin: 0;
	font-size: 1.1em;
  }

  p {
	color: var(--default-text-color);
  }

  main {
	display: grid;
	justify-items: center;
	height: 100%;
	width: 98vw;
	margin: auto;
	padding: auto;
	background: var(--default-bg-color);
	font-family: "Roboto";
	align-content: center;
  }

  .systemsg {
	text-align: center;
	display: flex;
	flex-direction: column;
	margin: 0;
	margin-top: 0.2em;
	padding: 0;
	font-size: 0.9em;
	color: rgb(151, 151, 151);
  }

  .chat {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 70vh;

	border-radius: 15px;
	margin: 0;
	max-width: 450px;
	width: 95%;
	justify-content: center;
	word-wrap: break-word;
	margin-bottom: 10px;
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

  .chat ::-webkit-scrollbar {
	display: none;
  }

  article {
	margin: 0 0 0.2em 0;
	position: relative;
  }
  #commentdate {
	height: 0;
	overflow: hidden;
	font-size: 0.8em;
	transition: all 0.4s ease-out;
	-webkit-transition: all 0.4s ease-in-out;
	margin: 0 5px 0;
  }
  .nothing {
	opacity: 0;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: absolute;

	-webkit-user-select: text; /* Chrome all / Safari all */
	-moz-user-select: text; /* Firefox all */
	-ms-user-select: text; /* IE 10+ */
	user-select: text;
  }

  .nothing:focus + div#commentdate {
	display: block;
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
	color: var(--default-othertext-color);
  }

  .user span {
	background-color: var(--default-span-color);
	color: var(--default-usertext-color);
	border-radius: 1em 1em 0 1em;
	text-align: left;
	max-width: 70%;
	word-wrap: break-word;
  }
  .otherusert {
	margin: 0.1em 0 0.1em 0.5em;
	color: var(--default-text-color);
	font-weight: bold;
	max-width: 200px;
  }
  .bot_respond {
	margin: 0.5em 0 0.1em 0.5em;

	font-weight: bold;
	max-width: 200px;
	color: red;
  }

  .user input.nothing {
	opacity: 0;
	top: 0;
	right: 0;
	width: 100%;
	float: right;
	position: absolute;
  }
  button {
	position: relative;
	float: right;

	margin: auto 5px;
	background: none;
	cursor: pointer;
	display: block;
	font-weight: 500;
	color: var(--default-text-color);
	letter-spacing: 0.08929em;
	text-transform: uppercase;
	font-weight: bold;
	border: none;
	font-size: 1.1em;
	padding: 0;
	height: 100%;
  }
  .msg-input {
	border: 2px solid var(--default-text-color);
	display: flex;
	max-width: 446px;
	height: 40px;
	justify-items: space-around;
	position: relative;
	border-radius: 10px;
  }
  /* .emojicontainer{
		float: right;
		width: 5%;
		position: relative;
		height:100%;
		margin:auto;
	} */
  .msg-input > [contenteditable] {
	position: relative;
	width: 100%;
	border: none;
	outline: none;
  }
  [contenteditable] {
	display:inline-block;
	overflow: hidden;
	margin: auto 10px;
	text-align: left;
	padding: 0.1em;
  
	background: none;
	position: relative;
	color: var(--default-text-color);
	align-items: center;
	font-size: 1.1em;

	text-overflow: ellipsis;
  }
  :global([contenteditable] > .emoji) {
	height: 1em;
	width: 1em;
	margin: 0 0.05em 0 0.1em;
	vertical-align: -0.1em;
  }

  :global(article > span > .emoji) {
	height: 1em;
	width: 1em;
	margin: 0 0.05em 0 0.1em;
	vertical-align: -0.1em;
  }

  @media only screen and (max-width: 500px) {
	.scrollable {
	  font-size: 0.95em;
	}
  }
</style>

<svelte:head>

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script
	async
	src="https://www.googletagmanager.com/gtag/js?id=UA-158899098-1">

  </script>
  <script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
	  dataLayer.push(arguments);
	}
	gtag("js", new Date());

	gtag("config", "UA-158899098-1");
  </script>
  <link
	href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
	rel="stylesheet" />
</svelte:head>


<main>

  <Headdiv bind:name />

  <div class="chat" id="chat">
	<div class="scrollable" bind:this={div}>
	  {#each comments as comment, i}
		{#if comment.author === 'system'}
		  <span class="systemsg">{comment.text}</span>
		{:else}
		  {#if i != 0 && comment.author != comments[i - 1].author}
			{#if comment.type === 'bot'}
			  <p class="bot_respond">{comment.author}:</p>
			{:else if comment.author != name}
			  <p class="otherusert">{comment.author}:</p>
			{/if}
		  {/if}
		  <article class={comment.author === name ? 'user' : 'other'}>
			{#if comment.type === 'link'}
			  <span>
				<Linkpreview
				  title={comment.title}
				  image={comment.image}
				  description={comment.description}
				  url={comment.text} />
			  </span>

			{:else}
			  <span>
				{@html comment.text}
			  </span>
			{/if}
			<input class="nothing" type="button" />
			<div id="commentdate">{comment.time}</div>
		  </article>
		{/if}
	  {:else}
		<!-- this block renders when photos.length === 0 -->
		<center>
		  <p>Comments are loading...</p>
		</center>
	  {/each}
	</div>

	<div class="msg-input" id="msg-input" use:Anchor bind:this={anchor2}>
	  <div
		contenteditable="true"
		bind:innerHTML ={input1}
		on:keydown={handleKeydown} />
	  <!-- <input bind:this={input1} on:keydown={handleKeydown} /> -->

	  <Emoji on:emojiClicked={alertmsg} />
	  <button type="submit" on:click={handleKeydown}>Send</button>

	</div>

  </div>

</main>
