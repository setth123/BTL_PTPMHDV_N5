import Car from "../Models/Car.js";

const new_cars=[
    {name:'Honda CR-V 2021',pictureURL:'https://i1-vnexpress.vnecdn.net/2021/09/18/HondaCRVjpg-1631980227.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=jrYfBdJJTKiJE_4iKld_Lg&t=image'},
    {name:'Mitsubishi Attrage 2021',pictureURL:'https://i1-vnexpress.vnecdn.net/2021/09/10/aaaaajpg-1631248596.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=YKXuHuQNVAlYOGhQTvV6WQ&t=image'},
    {name:'Mitsubishi Outlander 2021',pictureURL:'https://i1-vnexpress.vnecdn.net/2021/10/12/MitsubishiTritonJPG76261591351006jpeg-1634031238.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=wF6vIaAqJs4eW4eoQqaxJw&t=image'},
    {name:'Mitsubishi Pajero Sport 2021',pictureURL:'https://i1-vnexpress.vnecdn.net/2021/09/19/NgoithtShowroom7jpg-1632025387.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=bXDeDXLi1cLDc5-oVA3eoQ&t=image'},
    {name:'Mitsubishi Triton 2021',pictureURL:'https://i1-vnexpress.vnecdn.net/2021/09/19/00200184800Still001jpg-1632025742.jpg?w=220&h=132&q=100&dpr=1&fit=crop&s=C9r_ibR4wVah8qHNtn0ULQ&t=image'},
]
async function insert(){
    await Car.insertMany(new_cars);
}
export default insert;
