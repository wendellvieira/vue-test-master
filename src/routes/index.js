import AppHome from '../components/home.vue'
import AddUserEdit from "../components/add-user.vue"

export default [
	{
		path: '/', component: AppHome, 
		children : [
			{path: 'edit/:userId', component: AddUserEdit}
		]
	}
]