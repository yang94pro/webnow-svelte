<script>

    import Theme from './Theme.svelte'
    export let name;
    	  
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
    };


    window.onload = () => {
        var tyy = document.getElementById("typewriter");
        var typewriter = setupTypewriter(tyy);
        let div = document.getElementsByClassName("scrollable")[0]
        typewriter.type();
        window.addEventListener("resize", function() {
            if (window.innerHeight < 680) {
                tyy.style.height = "0";
                div.scrollTo(0, div.scrollHeight);
            } else {
                tyy.style.height = "70px";
                document.getElementById("chat").style.height = "70vh";
            }
        });
    };




</script>


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


<style>
    .side_note{
	
		margin:0;
		position: relative;
		padding: 0;
		display: block;
		height: 60px;
		

	}
	#typewriter{
		
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
		margin: 0;
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
    }


</style>