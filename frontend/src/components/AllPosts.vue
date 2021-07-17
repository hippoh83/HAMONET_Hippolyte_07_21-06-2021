<template>
    <div class="posts">
        <article class="postcard" v-for="(post, pt) in Posts.posts" :key="pt" >
            <router-link class="router" :to=" { name: 'onepost', params: { id: post.id }} ">
                <p class="post-username">Par {{ post.User.userName }} - {{ datePost(post.createdAt) }}</p>
                <hr>
                <h3 class="post-name"><strong>{{ post.name }}</strong></h3>
                <p class="post-content"> {{ post.description }} </p>
                <div class="post-image" v-if="post.imageUrl != null"><img :src="post.imageUrl"></div> 
                <div class="noComments" v-if="post.Comments.length == 0">
                    <p>Pas de commentaires.</p>
                </div>
                <div class="comments" v-if="post.Comments.length != 0">
                    <div class="Onecomments"  v-for="comment in post.Comments" :key="comment.id">
                        <div class="comment-user"> {{comment.User.userName}} - {{ datePost(comment.createdAt) }}</div>
                        <div class="comment-content"> {{ comment.description }} </div>
                    </div>
                </div>
            </router-link>
        </article>
    </div>
</template>



<script>
import axios from 'axios';

export default {
    name: 'AllPosts',

    data() {
        return {
            Posts: [],
            
        }
    },
    mounted() {
            this.getAllPost();
            console.log(this.Posts);
    },
    
    
    methods: {
        getAllPost() {
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/post/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res)
                this.Posts = res.data;
            })
            .catch((error) => console.log(error));
        },
        datePost(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-Fr', options);
        }
        
    }
}
</script>


<style lang="scss">
.posts{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
}
.router{
    text-decoration: none;
    color: black;
    width: 350px;
}
.postcard{
    border: 1px solid #0F1E41; 
    background-color: white;
    box-shadow: 1px 1px 5px #0F1E41;
    padding: 15px;
    margin: 10px;
    margin-top: 5px;
    
    border-radius: 5px;
    width: 350px;
    min-height: 180px;
    max-height: 500px;
    hr{
        color: black;
        border: 1px solid black;
        margin: none;
    }
    .post-username{
        color: darken(lightgrey, 40%);

    }
    .post-name{
        color: black;
        font-size: 20px;
        text-align: left;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .post-image{
        display: block;
        width: 100%;
        height: 60%;
        margin-top: 14px;
        
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
            border: 1px solid #0F1E41; 
        }
    }
    .noComments{
        width: 100%;
        min-height: 30px;
        height: auto;
        display: flex;
        align-items: center;
        padding-left: 5px;
        margin-top: 20px;
        border: 1px solid #0F1E41;
        border-radius: 5px;
        background-color:  lighten(lightgrey, 15%) ;

    }
    .comments{
        width: 100%;
        min-height: 50px;
        overflow: scroll;
        max-height: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        border: 1px solid #0F1E41;
        border-radius: 5px;
        background-color:  lighten(lightgrey, 12%) ;

    }
    .Onecomments{
        width: 95%;
        min-height: 40px;
        overflow: scroll;
        display: block;
        margin-top: 5px;
        border: 1px solid #0F1E41;
        border-radius: 5px;
        background-color:  white ;
        .comment-user{
            color: darken(lightgrey, 40%);
            font-size: 13px;
            padding: 2px;
        }
        .comment-content{
            padding-top: 3px;
            padding-left: 2px;
        }

    }

}
</style>