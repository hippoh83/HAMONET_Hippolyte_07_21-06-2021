<template>
    <div class="newPost">
        
        <div class="Post">
            <h1>Quoi de neuf ?</h1>
            <form class="form" @submit.prevent="newPost">
                <input name="name" ref="name" class="formNewPost" placeholder="Titre de votre post" required v-model="post.name"/><br>
                <textarea name="description" ref="description" class="formNewPost" placeholder="Que voulez-vous dire ?" required v-model="post.description"></textarea> <br>
                <input class="formimg" type="file" id="file" accept=".png, .jpg, .jpeg" ref="imageUrl"> <br>
                <button class="buttonpost" type="submit">Publier</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'newPost',
    data() {
        return {
            post : {
            name: "",
            description: "",
            },
            image : "undefined",
            
            
        };
    },
    methods: {
        newPost() {
            const token = localStorage.getItem("token");
            const post = JSON.stringify(this.post);
            this.image = this.$refs.imageUrl.files[0];
            
            
            
            if(this.image != undefined){
                const files = this.image;
                const file = new FormData();
                file.append("post", post);
                file.append("image", files);
                console.log(file);
                

           axios.post("http://localhost:3000/api/post/",
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
                    window.location.reload();
            })
            .catch(error => 
            {
                console.log( error )
            });
            } else if(this.image === undefined) {
            axios.post("http://localhost:3000/api/post/",
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
                    window.location.reload()
            })
            .catch(error => 
            {
                console.log( error )
            });
            }
            
        }
    }
}
</script>

<style lang="scss">
.newPost{
    display: flex;
    justify-content: center;
    align-items: center;
}
.Post{
    border: 1px solid #0F1E41; 
    background-color: white;
    box-shadow: 1px 1px 5px #0F1E41;
    padding: 15px;
    margin: 10px;
    margin-top: 40px;
    
    border-radius: 5px;
    width: 350px;
    height: 300px;
    h1{
        color: black;
        font-size: 22px;
        text-align: center;
        padding-bottom: 10px;
    }
    form{
        display: flex;
        flex-direction: column;
        color: black;
        .formNewPost{
            height: 30px;
            border-radius: 5px;
            background-color: lighten(lightgrey, 10%);
            border: 1px solid #0F1E41;
            margin-top: 10px;
        }
        .formimg{
            color: #0F1E41;
        }
        .buttonpost {
            height: 30px;
            border-radius: 5px;
            background-color: lighten(lightgrey, 10%);
            border: 1px solid #0F1E41;
            margin-top: 10px;
            transition: transform, 300ms, ease;
            &:hover{
                background-color: #C2595E;
                cursor: pointer;
                color: black;
                border: 1px solid #C2595E;

            }

        }

    }
}

</style>