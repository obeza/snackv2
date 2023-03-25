import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosClient from './../axios/index';

import { useRoute, useRouter } from 'vue-router';


export const useShopStore = defineStore('shopSnack', () => {

  console.log('#### STORE #####')

  

  // const shop = ref({
  //   rubriques:[],
  //   isLoading: true
  // })
  const rubriques = ref([])
  const isLoading = ref(true)
  const panier = ref([])
  //const restoId = ref("")

  const dataPanier = computed(()=>{
    return panier.value
  })

  // test si le store est vide
  if (!rubriques.value.length){
    console.log('relance la session ...')
      const router = useRouter()
      const route = useRoute()
      const id = route.params.restoId
      router.push({name:'start', params:{ id}});
  
  }

  const dataShop = computed(()=> {
    console.log('computed data...')
    console.log('get data ...' + rubriques.value)
    if (rubriques.value.length){
      console.log('get data ...' + rubriques.value)
      return rubriques.value
    } else {
      console.log('reload app ...')
      const router = useRouter()
      const route = useRoute()
      const id = route.params.restoId
      router.push({name:'start', params:{ id}});
      //window.location.href = `/${id}`;
      return null
    }
  })

  function getShopInfos(resto_id:string){
    console.log('getShop' + resto_id)

    return new Promise((resolve, reject)=>{

      try {
        axiosClient.get( `/shop/${resto_id}` )
        .then(response =>{
          console.log( "msg loaded : ", response.data )

          rubriques.value = response.data.shop
          //restoId.value = resto_id
          isLoading.value = false
          resolve(null)
        })

        
      }catch(error){
        console.log('getShopinfos error ' + error)
        reject()
      }

    })
  }

  function getRubiqueTitle(rubId){
    const titre = rubriques.value.find(rub => rub.id== rubId)?.titre
    console.log('getRubiqueName titre ' + JSON.stringify( titre))
    return titre
  }

  function getArticles(rubId){
    const articles = rubriques.value.find(rub => rub.id== rubId)?.articles
    console.log('rubrique ' + JSON.stringify( articles))
    return articles
  }

  function ajouterPanier(article){
    console.log("🚀 ~ file: shop.ts:80 ~ ajouterPanier ~ article:", article)
    const panierA = [...panier.value]
    panierA.push(article)
    panier.value = panierA
  }

  console.log('#### /END STORE #####')

  return {
    isLoading,
    //restoId,
    rubriques,
    panier, 
    getRubiqueTitle,
    getArticles,
    dataShop, 
    getShopInfos,
    ajouterPanier,
    dataPanier
  }
})

export default useShopStore