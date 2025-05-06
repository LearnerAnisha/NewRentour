import ProductList from "../../Components/ProductList";


const Mobiles = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-6">Mobiles</h1>
            <ProductList category={"Smartphones"} />
        </div>
    );
};

export default Mobiles;
