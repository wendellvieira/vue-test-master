<template>
	<div>
		<div class="col-xs-4 col-xs-offset-4">
			<h3>
				Lista de usuários
				<router-link 
					class="btn btn-info btn-xs pull-right"
					to='/edit/new'>
					<i class="fa fa-plus"></i>
					Novo
				</router-link >
			</h3>
			<router-view
				@UpdateFunction = 'UpdateFunctionHome'
				@CreateFunction = 'CreateFunctionHome'>
			</router-view>
			<table class="table table-hover table-bordered table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>Nome</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(user, key) in listUser'>
						<td>{{user.id}}</td>
						<td>
							{{user.nome}}

							<span class='pull-right'>
								<router-link class='btn btn-primary btn-xs' :to="'/edit/' + user.id">
									<i class="fa fa-edit"></i>
								</router-link>
								<button 
									class="btn btn-danger btn-xs"
									@click='RemoveUser(user.id, key)'>
									<i class="fa fa-trash"></i>
								</button> 
								
							</span>

						</td>
						
					</tr>
				</tbody>
			</table>
			<!-- <pre>{{listUser}}</pre> -->
		</div>
	</div>
</template>
<script>
	import http from '../axios/http-commun.js'

	export default {
		name : "AppHome",
		data(){
			return {
				listUser: []
			}
		},
		methods : {
			RemoveUser(id, key){
				if(confirm("Deseja realmente apagar esse usuário?")){
					http.delete(`usuarios/${id}`)
					.then((data) => {
						if(data.request.responseText == '{}'){
							this.listUser.splice(key, 1)
						}					
					})
					
				}
			},
			UpdateFunctionHome(data){
				const rowId = this.listUser.findIndex(u=>{ return u.id == data.id})
				this.$set(this.listUser, rowId, data)
				//alert("Dados alterados com sucesso!")
			},
			CreateFunctionHome(data){
				console.log(data)
				this.listUser.push(data);
				//alert("Usuário cadastrado com sucesso!");
			}
		},
		mounted(){
			http.get('usuarios')
			.then((data)  => {
				this.listUser = JSON.parse(data.request.responseText);
			})
		}
	}
</script>