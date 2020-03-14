<script>
    import {createEventDispatcher} from 'svelte';
    export let emoji;
    const dispatch = createEventDispatcher();



</script>
    <div id='emojii'  >
        {#each emoji as emo}
            <span  on:click={()=> dispatch('emojiClicked',{detail:emo.code})}>{@html emo.code}</span> 
        {/each} 
    </div>

<style>

    #emojii{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: row;
        position: relative;
       


    }
    span {
        height: 2em;
        width: 2em;
        margin: 0 .1em 0.5em .5em;
        vertical-align: -0.1em;
        cursor: pointer;
    }

    :global().emoji{
        width:24px;
    }
    
</style>