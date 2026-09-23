export const pages=[
 ['Entrantes','PARA COMPARTIR',['Croquetas de jamón','Bruschetta mediterránea','Calamares crujientes','Ensalada burrata','Patatas bravas','Tartar de atún','Provoleta al horno','Empanadas de carne','Pulpo a la plancha','Sopa del día']],
 ['Platos Principales','NUESTRA SELECCIÓN',['Lomo a la parrilla','Salmón al limón','Pasta trufada','Pollo de campo','Risotto de hongos','Hamburguesa de la casa','Paella de mariscos','Costillas glaseadas','Ravioles de ricotta','Pescado del día']],
 ['Postres','UN FINAL DULCE',['Tiramisú','Volcán de chocolate','Cheesecake','Crema catalana','Helado artesanal','Tarta de manzana','Panna cotta','Brownie tibio','Fruta fresca','Affogato']],
 ['Bebidas','PARA ACOMPAÑAR',['Agua mineral','Limonada de la casa','Zumo natural','Café espresso','Cappuccino','Té e infusiones','Refresco','Cerveza sin alcohol','Mocktail cítrico','Agua con gas']]
];
export const descriptions=['Cremoso, fresco y preparado al momento','Con hierbas, aceite de oliva y toque de limón','Crujiente por fuera y suave por dentro','Receta de la casa con ingredientes de temporada'];
export const price=(pageIndex,itemIndex)=>4+((pageIndex*10+itemIndex)*3)%19;


/* V6.9 demo food photography. Replace with restaurant-owned photos later. */
export const dishImages={
 'Croquetas de jamón':'https://www.themealdb.com/images/media/meals/6dpa7m1763331105.jpg',
 'Bruschetta mediterránea':'https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/bruschetta_with_tomatoes_and_olives.jpg',
 'Calamares crujientes':'https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/calamares_fritos.jpg',
 'Ensalada burrata':'https://rikkesimo.files.wordpress.com/2019/11/ensalada-de-burrata-6.jpg',
 'Patatas bravas':'https://jurnalul.ro/thumbs/big3/2026/01/21/tapasul-spaniol-perfect-patatas-bravas-reteta-originala-18990472.webp',
 'Tartar de atún':'https://images.deliveryhero.io/image/fd-ph/LH/i4t7-hero.jpg?height=384&quality=45&width=512',
 'Provoleta al horno':'https://rikkesimo.files.wordpress.com/2019/11/ensalada-de-burrata-6.jpg',
 'Empanadas de carne':'https://media.elgourmet.com/recetas/thumb/thumb_uwblx8sqre_cabarajpg.jpg',
 'Pulpo a la plancha':'https://www.booknbook.london/storage/public/restaurants/3967-sparrow-italia-mayfair/profile/309880959_115132414687157_4902942192707671337_n.jpg',
 'Sopa del día':'https://www.gastronosfera.com/sites/default/files/inline-images/bodegueta-ensalada.jpg',
 'Lomo a la parrilla':'https://s.yimg.com/ny/api/res/1.2/OpTEasro1KEBDWun_m8WGQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTU1OA--/https%3A/media.zenfs.com/es/animal_gourmet_468/d9d3386f4f017b5e544f9f2922114c07',
 'Salmón al limón':'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k/Photo/Recipes/2024-09-5-ingredient-lemon-butter-salmon/5-ingredient-lemon-butter-salmon-546',
 'Pasta trufada':'https://www.booknbook.london/storage/public/restaurants/3967-sparrow-italia-mayfair/profile/309880959_115132414687157_4902942192707671337_n.jpg',
 'Pollo de campo':'https://degusta-pictures-hd.b-cdn.net/1_109296_s_5.jpg?v=547',
 'Risotto de hongos':'https://mesa.express/files/logos/img-20250923-wa0181.jpg',
 'Hamburguesa de la casa':'https://grupocamachos.com/menu/wp-content/uploads/2023/06/machos.jpg',
 'Paella de mariscos':'https://de.cdn-website.com/18b032848431406db455af4a28216966/MOBILE/jpg/912891-carta-3.jpg',
 'Costillas glaseadas':'https://degusta-pictures-hd.b-cdn.net/1_109296_s_5.jpg?v=547',
 'Ravioles de ricotta':'https://www.ducamp.com.br/imagens/conteudos/a07fe404fe7c09e6671e83fb5cbc081a/ravioli-de-ricota-ducamp.jpg',
 'Pescado del día':'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k/Photo/Recipes/2024-09-5-ingredient-lemon-butter-salmon/5-ingredient-lemon-butter-salmon-546',
 'Tiramisú':'https://www.cookingclassy.com/wp-content/uploads/2022/08/tiramisu-17-500x500.jpg',
 'Volcán de chocolate':'https://alogar.cl/cdn/shop/products/Lava-Cake_89ffccd3-4ddc-43a3-8de8-034acb3ef5b4.jpg?v=1646846002&width=1445',
 'Cheesecake':'https://cdn.grid.id/crop/0x0%3A0x0/700x465/smart/filters%3Aformat%28webp%29%3Aquality%28100%29/photo/2021/06/16/panna-cottajpg-20210616084921.jpg',
 'Crema catalana':'https://s1.elespanol.com/2023/03/02/como/745436082_231343311_1024x576.jpg',
 'Helado artesanal':'https://baybistro.cafe/storage/138/01JWXQJSTNR4E5Z5N6D1EFWH9T.webp',
 'Tarta de manzana':'https://www.giallozafferano.es/images/15-1533/Tarta-de-manzana-clasica_1200x800.jpg',
 'Panna cotta':'https://cdn.grid.id/crop/0x0%3A0x0/700x465/smart/filters%3Aformat%28webp%29%3Aquality%28100%29/photo/2021/06/16/panna-cottajpg-20210616084921.jpg',
 'Brownie tibio':'https://alogar.cl/cdn/shop/products/Lava-Cake_89ffccd3-4ddc-43a3-8de8-034acb3ef5b4.jpg?v=1646846002&width=1445',
 'Fruta fresca':'https://media.sitioandino.com.ar/p/715236b7da11cf464a40aea01ba0c264/adjuntos/335/imagenes/000/829/0000829578/790x0/smart/ensalada-frutas-fiestas.png',
 'Affogato':'https://baybistro.cafe/storage/138/01JWXQJSTNR4E5Z5N6D1EFWH9T.webp',
 'Agua mineral':'https://www.moscow-restaurants.ru/netcat_files/38/26/1830/IMG_1497.jpeg_800.jpg',
 'Limonada de la casa':'https://estaticos-cdn.prensaiberica.es/clip/3814e1b1-7f82-4507-996b-a296a88b784b_source-aspect-ratio_default_0.jpg',
 'Zumo natural':'https://lesbonnesrecettes.fr/images/seo/recette/cocktail-rafraichissant-aux-agrumes-sans-alcool-8310.webp',
 'Café espresso':'https://static.wixstatic.com/media/nsplsh_6e69416b52314832347445~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/nsplsh_6e69416b52314832347445~mv2.jpg',
 'Cappuccino':'https://i.pinimg.com/originals/51/05/86/510586fdf6c57cb2a0c93ded039b4384.jpg',
 'Té e infusiones':'https://static.wixstatic.com/media/nsplsh_6e69416b52314832347445~mv2.jpg/v1/fill/w_1000,h_667,al_c,q_85,usm_0.66_1.00_0.01/nsplsh_6e69416b52314832347445~mv2.jpg',
 'Refresco':'https://lesbonnesrecettes.fr/images/seo/recette/cocktail-rafraichissant-aux-agrumes-sans-alcool-8310.webp',
 'Cerveza sin alcohol':'https://bk-latam-prod.s3.amazonaws.com/sites/burgerking.latam/files/BK_Web_CERVEZA_500X540px.png',
 'Mocktail cítrico':'https://lesbonnesrecettes.fr/images/seo/recette/cocktail-rafraichissant-aux-agrumes-sans-alcool-8310.webp',
 'Agua con gas':'https://www.moscow-restaurants.ru/netcat_files/38/26/1830/IMG_1497.jpeg_800.jpg'
};