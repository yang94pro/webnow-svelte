<script>
    export let title, url, description, image




</script>


<style>
    .linkp{
        display: flex;
        flex-direction: column;
        position: relative;
        margin:0;
        width: 100%;
        height: 100%;

    }
    a{
        text-decoration: none;
        color: inherit;
    }

    img{
        width: auto;
        height: 120px;
        float: left;
        position: relative;
    }
    .webtitle{

        margin:0;
        font: 700;
        font-size: 12px;


    }
    p{
        margin:0;
        font-size: 12px;
    }

</style>
<a href={url} target="_blank">
<span class="linkp" href={url}>
    <img await src={image} alt="Web logo">
    <h3 class="webtitle">{title}</h3>
    <p>{description}</p>
</span></a>
