export default  {
    methods : {
      formatearFecha : function(value) {
        let date = new Date(value);
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        
        if(month < 10){
          return `${day}-0${month}-${year}`;
        }else{
          return `${day}-${month}-${year}`;
        }        
      },

      ponerPeso : function (string){
        return  "$" + string;
      }
    },

    computed: {

    }
}