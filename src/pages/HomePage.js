import React from "react";

import MenuNav from "../components/MenuNav";

const HomePage = () => {
  return (
    <div className="flex flex-row space-y-3 ">
      <MenuNav className="mr-6" />
      <div className=" container w-3/4 flex flex-col space-y-10">
        <div className="about space-y-3 ">
          <h3 className="text-center" >QaraliAsh</h3>
          <p>
            Restoranlar şəbəkəsində həftə içi və həftə sonu olmaqda səhər
            yeməyi, biznes görüşlərinizin, təqdimatların keçirilməsi üçün ayrıca
            otaqlar, dostlarınız, həmkarlarınızla çay-kofe guşəsində rahatlıqla
            söhbət etmə imkanı, həmçinin işdən sonra günün gərginliyi
            üzərinizdən atmağa kömək edəcək canlı musiqi mövcuddur. Dostlarınız,
            doğmalarınızla zəngin milli, türk və avropa mətbəxinə aid dadlı
            təamlardan dada, ailənizlə birlikdə rahat şəkildə əylənə və
            istirahət edə bilərsiniz. Restoranların hər birində hər zövqə uyğun
            menyudan istifadə etməklə hər müştəriyə özəl yanaşmanı hiss etmək
            mümkündür.
          </p>
        </div>
        <div className="order-info">
            <p>Gun erzinde sifarislerin sayi:</p>
            <p>Cemi gelir:</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
