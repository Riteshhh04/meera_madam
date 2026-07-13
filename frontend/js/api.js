const API = {

    async get(module){

        const res = await fetch(`http://localhost:3000/api/${module}`);

        return await res.json();

    },

    async create(module,data){

        return fetch(`http://localhost:3000/api/${module}`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

    },

    async update(module,id,data){

        return fetch(`http://localhost:3000/api/${module}/${id}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

    },

    async delete(module,id){

        return fetch(`http://localhost:3000/api/${module}/${id}`,{

            method:"DELETE"

        });

    }

};