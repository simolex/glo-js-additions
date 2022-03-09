"use strict";

const selectCars = () => {
  const selector = document.querySelector(".cars__select>select");
  const view = document.querySelector(".cars__view");

  const getCars = () => {
    try {
      return fetch("./cars.json", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          return data.cars;
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectByBrand = async (brand) => {
    const cars = await getCars();
    return cars.filter((item) => {
      return item.brand === brand;
    });
  };

  getCars()
    .then((cars) => {
      const uniqList = {};
      if (!cars) {
        throw new Error("перечень автомобилей пуст");
      }
      cars.forEach((item) => {
        if (!uniqList[item.brand]) {
          uniqList[item.brand] = "+";
          const brandOption = document.createElement("option");
          brandOption.value = item.brand;
          brandOption.textContent = item.brand;
          selector.append(brandOption);
        }
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  selector.addEventListener("change", (e) => {
    selectByBrand(e.target.options[e.target.selectedIndex].value)
      .then((data) => {
        view.innerHTML = "";
        !!data &&
          data.forEach((item) => {
            const lineCar = document.createElement("ul");
            lineCar.classList.add("cars__item");
            lineCar.innerHTML = `
          <li class="cars__property">Производитель: ${item.brand}</li>
          <li class="cars__property">Модель: ${item.model}</li>
          <li class="cars__property">Цена: ${item.price}</li>
          `;
            view.append(lineCar);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};
selectCars();
