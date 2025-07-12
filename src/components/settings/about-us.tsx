import '../../style/framework.css';

function AboutUs() {

    // Simple one liner for console log in comment
    // var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
    
    // Calculate local storage usage
    return (
    <>
        <div className="em-content-wrap">
            <div>Local storage used:</div>
            {
                Object.keys(localStorage).length > 0 ? (
                    Object.keys(localStorage).map((key, index) => (
                        <div key={index}>{ (String(key).charAt(0).toUpperCase() + String(key).slice(1)).match(/[A-Z][a-z]+|[0-9]+/g)?.join(" ")} = {((localStorage[key].length + key.length) * 2 / 1024).toFixed(2)} KB</div>
                    ))
                ) : (
                    <div>No data in local storage.</div>
                )
            }
            <div>
                Total =  
                {
                    Object.keys(localStorage).length > 0 ? (
                        Object.keys(localStorage).reduce((total, key) => total + (localStorage[key].length + key.length) * 2  / 1024, 0)
                    ).toFixed(2) : 0
                } KB
                </div>
        </div>

    </>
    )
}

export default AboutUs;