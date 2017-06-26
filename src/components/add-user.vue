<template>
	<div>
		<div class="well well-sm">
			<div class="row">
				<div class="col-xs-8">
					<input type="text" @keyup.enter='action' 
						v-model='data.nome' placeholder="Nome" class="form-control">
				</div>
				<div class="col-xs-4">
					<button @click='CreateUser' v-if='data.id==null' class="btn btn-info btn-block">
						<i class="fa fa-plus"></i>
						Criar
					</button>
					<button @click='UpdateUser' v-else class="btn btn-success btn-block">
						<i class="fa fa-save"></i>
						Salvar
					</button>
				</div>
			</div>
		</div>
		<!-- {{data}} -->
	</div>
</template>
<script>
	import http from '../axios/http-commun.js'

	export default {
		name: 'AddFormUser',
		data(){
			return {
				data: {
					id: null,
					nome: ''
				}
			}
		},
		methods:{
			action(){
				if(this.data.id == null){
					this.CreateUser()
				}else{
					this.UpdateUser()
				}
			},
			UpdateUser(){
				console.log(this.listUser)
				http.put('usuarios/' + this.data.id, { nome : this.data.nome})
				.then(resp => {
					this.$emit('UpdateFunction', this.data)
					this.$router.push('/')
				})
			},
			CreateUser(){
				http.post('usuarios/', { nome : this.data.nome})
				.then(resp => {
					this.$emit('CreateFunction', resp.data)
					this.$router.push('/')
				})
			}
		},
		watch : {
			'getUser' : function(val){
				if(this.getUser != 'new'){
					http.get('usuarios/' + val)
					.then(resp => {
						this.data = resp.data[0]
					})
				}else{
					this.data = {
						id: null,
						nome: ''
					}
				}
				
			}
		},
		computed : {
			getUser(){				
				return this.$route.params.userId
			}
		},
		mounted(){
			if(this.getUser != 'new'){
				http.get('usuarios/' + this.getUser)
				.then(resp => {
					this.data = resp.data[0]
				})				
			}
		}
	}
</script>