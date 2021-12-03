import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';
const _defaultMessage = 'Search for the Movie Title.';
export default {
  namespaced : true, 
  state: ()=>({
    movies : [],
    message : _defaultMessage,
    loading : false,
    theMovie:{},
  }),
  mutations:{
    //공통 변이 메소드 ㄷㄷ
    updateState(state, payload){
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      })
    },
    resetMovies(state){
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    }
  },
  actions:{
    // context, payload
    async serachMovies({commit, state}, payload){
      if(state.loading){ //중복클릭 방지
        return;
      }
      commit('updateState',{
        message:'',
        loading:true,
      })
      try {
        const res = await _fetchMovies({
          ...payload,
          page:1
        });
  
        const { Search, totalResults } = res.data;
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID'),
        });
  
        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10); // 268 / 10 올림처리 27페이지 개수
  
        //추가 요청 전송
        if(pageLength > 1){
          for (let page = 2; page < pageLength; page++) {
            if(page > (payload.number / 10)){
              break;
            }
            const res = await _fetchMovies({
              ...payload,
              page
            });
            const {Search} = res.data;
            commit('updateState',{
              movies:[...state.movies, ..._uniqBy(Search,'imdbID')]
            })
          }
        }
      } catch (message) {
        commit('updateState',{
          movies:[],
          message,
        });
      } finally {
        commit('updateState',{
          loading:false
        })
      }
    },
    
    async searchMovieWithId({commit, state}, payload){
      if(state.loading){ //중복클릭 방지
        return;
      }
      commit('updateState',{
        loading:true,
        theMovie: {}
      })

      try {
        const res = await _fetchMovies(payload);
        commit('updateState',{
          theMovie : res.data
        })
      } catch (error) {
        commit('updateState',{
          theMovie : {}
        })
      }finally{
        commit('updateState',{
          loading: false,
        })
      }
    }
  },
}

function _fetchMovies( payload ){
  const { title, type, number, year, page, id } = payload;
  const OMDB_API_KEY = "7035c60c";
  const url = id ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  return new Promise( (resolve, reject) =>{
    axios.get(url)
    .then(res=>{
      if(res.data.Error){
        reject(res.data.Error);
      }
      resolve(res);
    })
    .catch(err=>{
      reject(err);
    })
  })
}
