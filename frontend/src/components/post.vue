<template>
  <div class="Onepost">
      <article class="post" v-if="mypost !== undefined">
                <div class="post-username">  
                    Publié par {{ mypost.User.userName }}- {{ datePost(mypost.createdAt) }}
                    <button class="deletePost" @click="deletePost" v-if="userId == mypost.UserId || isAdmin == true">Supprimer</button>
                </div>
                <hr>
                <div class="post-name">  <strong> {{ mypost.name }} </strong> </div>
                <div class="post-content" v-html="mypost.description"></div>
                <div class="post-image" v-if="mypost.imageUrl != null"><img :src="mypost.imageUrl"></div>
                <form class="createComment" @submit.prevent="createComment">
                    <textarea name="newComment" class="newComment" placeholder="Que voulez-vous dire ?" v-model="comment.description" required></textarea> <br>
                    <button class="addComment" type="submit">Poster</button>
                </form>
                <div class="noComments" v-if="mypost.Comments.length == 0">
                    <p>Pas de commentaires.</p>
                </div>
                <div class="Comments" v-if="mypost.Comments.length != 0">
                <div class="OneComments" v-for="comment in mypost.Comments" :key="comment">
                    <div class="comment-user"> {{comment.User.userName}} - {{ datePost(comment.createdAt) }}</div>
                    <div class="comment-content"> {{ comment.description }} <button class="deleteComment" @click="deleteComment(comment.id)" v-if="userId == comment.UserId || isAdmin == true">Supprimer</button></div>
                    
                </div>
                </div>
                
    
        </article>      
        <div class="modifyPost" v-if="userId == mypost.UserId || isAdmin == true">
            <form class="form" @submit.prevent="modifyPost">
                <input name="name" ref="name" class="newPost" placeholder="Modifier le titre" required v-model="post.name"/><br>
                <textarea name="description" ref="description" class="newPost" required v-model="post.description"></textarea> <br>
                <input class="formimg" type="file" id="file" accept=".png, .jpg, .jpeg" ref="imageUrl"> <br>
                <button class="buttonmodifyPost" @click="modifyPost">Modifier</button>
            </form>
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: 'post',
  data() {
        return {
            mypost: [],
            comments: [],
            comment: {
                description : "",
                PostId : "",
            },
            post : {
            name: "",
            description: "",
            },
            image : "undefined",
            userId: "",
            isAdmin : "",

        }
    },
    mounted() {
        this.getOnePost();
        this.userId = localStorage.getItem('userId');
        this.isAdmin = localStorage.getItem('isAdmin');
    },
    methods: {
        getOnePost() {
            const PostId = this.$route.params.id
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/post/" + PostId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                this.mypost = res.data.posts;
                this.post.name = res.data.posts.name;
                this.post.description = res.data.posts.description;
            })
            .catch(error => {
                console.log( error)
            })
        },
        deletePost() {
            const token = localStorage.getItem('token')
            const PostId = this.$route.params.id
            axios.delete("http://localhost:3000/api/post/" + PostId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                    this.$router.push('/Posts'); 
                
            })
            .catch(error => {
                console.log(error)
            }) 
        },
        createComment() {
             this.comment.PostId = this.$route.params.id;
             const comment = JSON.stringify(this.comment);
            const token = localStorage.getItem("token");
            axios.post(`http://localhost:3000/api/comment/`, 
            {
                comment,
            },
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            )
            .then(res => {
                this.comments = res.data;
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteComment(idComment) {
            const token = localStorage.getItem('token')
            axios.delete(`http://localhost:3000/api/comment/${idComment}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        modifyPost() {
            const token = localStorage.getItem("token");
            const post = JSON.stringify(this.post);
            this.image = this.$refs.imageUrl.files[0];
            const id = this.$route.params.id;
            console.log(this.image);
            
            
            if(this.image != "undefined"){
                const files = this.image;
                const file = new FormData();
                file.append("post", post);
                file.append("image", files);
                console.log(file);
                

           axios.put("http://localhost:3000/api/post/" + id ,
                file,
                {
                headers: {
                    "accept" : '*/*',
                    "Content-Type" : "multipart/form-data; boundary= -----",
                    "Authorization": `Bearer ${token}`
                }
                })
            .then(() => 
            {
                     this.$router.push('/Posts'); 
            })
            .catch(error => 
            {
                console.log( error )
            });
            } else if(this.image == "undefined") {
            axios.put("http://localhost:3000/api/post/" +id,
                {
                post,
                },
                {
                headers: {
                    "accept" : '*/*',
                    "Authorization": `Bearer ${token}`
                }
                })
            .then(() => 
            {
                    this.$router.push('/Posts'); 
            })
            .catch(error => 
            {
                console.log( error )
            });
            }
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
.Onepost{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 50px;
    
}
.post{
    border: 1px solid #0F1E41; 
    background-color: white;
    box-shadow: 1px 1px 5px #0F1E41;
    padding: 15px;
    margin: 10px;
    margin-top: 20px;
    
    border-radius: 5px;
    width: 600px;
    min-height: 300px;
    max-height: 600px;
    hr{
        color: black;
        border: 1px solid black;
        margin: none;
    }
    .post-username{
        color: darken(lightgrey, 40%);
        display:flex;
        justify-content: space-between;
        align-items: center;
        
        button{
            border: 1px solid #0F1E41;
            border-radius: 5px;
            background-color:  lighten(lightgrey, 13%) ;
            height: 20px;
            &:hover{
                background-color: #C2595E;
                cursor: pointer;
                color: black;
                border: 1px solid #0F1E41;
                color:white;
            }
        }

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
        height: 45%;
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
        margin-top: 10px;
        border: 1px solid #0F1E41;
        border-radius: 5px;
        background-color:  lighten(lightgrey, 13%) ;

    }
    .Comments{
        width: 100%;
        min-height: 50px;
        max-height: 150px;
        overflow: scroll;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        border: 1px solid #0F1E41;
        border-radius: 5px;
        background-color:  lighten(lightgrey, 13%) ;

    }
    .OneComments{
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
            display:flex;
            justify-content: space-between;
            .deleteComment{
                width: 80px;
                margin: 3px;
                border-radius: 5px;
                border: 1px solid black;
                &:hover{
                    background-color: #C2595E;
                cursor: pointer;
                color: black;
                border: 1px solid #0F1E41;
                color:white;

                }

            }
        }

    }
    .createComment{
       display:flex;
       margin-top: 10px;
       width: 100%;
       .newComment{
        width: 95%;
        height: 30px;
        display: block;
        
        border: 1px solid #0F1E41;
        border-radius: 5px;
        background-color:  lighten(lightgrey, 13%) ;
       }
       button{
        
        margin-left: 10px;
        border: 1px solid #0F1E41;
        border-radius: 5px;
        background-color:  lighten(lightgrey, 13%) ;
        &:hover{
            background-color: #C2595E;
                cursor: pointer;
                color: black;
                border: 1px solid #0F1E41;
                color:white;
        }
       }
    }

}
.modifyPost{
    border: 1px solid #0F1E41; 
    background-color: white;
    box-shadow: 1px 1px 5px #0F1E41;
    padding: 15px;
    margin: 10px;
    margin-top: 20px;

    border-radius: 5px;
    width: 350px;
    height: 300px;
    form{
        display: flex;
        flex-direction: column;
        color: black;
        .newPost{
            height: 30px;
            border-radius: 5px;
            background-color: lighten(lightgrey, 10%);
            border: 1px solid #0F1E41;
            margin-top: 10px;
        }
        .formimg{
            color: #0F1E41;
        }
        .buttonmodifyPost{
            height: 30px;
            border-radius: 5px;
            background-color: lighten(lightgrey, 10%);
            border: 1px solid #0F1E41;
            margin-top: 10px;
            transition: transform, 300ms, ease;
            &:hover{
                background-color: #C2595E;
                cursor: pointer;
                border: 1px solid #0F1E41;
                color: white;

            }

        }

    }
}

</style>