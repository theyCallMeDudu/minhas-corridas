import CorridaCard from '../Card/Card';
import './List.css';
import useApi from "../../utils/useApi";

const CorridaList = ({ loading, corridas, error, refetch }) => {
    const [deleteCorrida, deleteCorridaInfo] = useApi({
        method: 'DELETE',
    });

    if (error) {
        return <div>Ops, ocorreu um erro!</div>
    }

    if (corridas === null || deleteCorridaInfo.loading) {
        return <div>Carregando...</div>
    }
    
    if (loading || corridas === null) {
        return <div>Carregando...</div>
    }

    if (corridas.length === 0) {
        return <div>Nenhum resultado encontrado.</div>
    }

    return (
        <div className='corrida-list'>
            {corridas.map((corrida) => (
                <CorridaCard 
                    corrida={corrida} 
                    onClickDelete={async () => {
                        await deleteCorrida({
                            url: `/corridas/${corrida.id}`
                        });
                        refetch();
                    }} 
                />
            ))}
        </div>
    );
}

export default CorridaList;