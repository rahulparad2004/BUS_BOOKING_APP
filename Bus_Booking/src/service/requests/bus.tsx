import apiClient from "../apiClient";

// export const fetchBuses = async (from: string, to: string, date: string) => {
//     const {data} = await apiClient.post('/bus/search', { from, to, date});
//     return data?.data || [];
// }

export const fetchBuses = async (from: string, to: string, date: string) => {
    try {
        const { data } = await apiClient.post('/bus/search', { from, to, date });
        return data?.buses || [];
    } catch (error) {
        console.error('Error fetching buses:', error.response?.data || error.message); // Debugging
        throw error;
    }
};

export const fetchBusDetails = async (busId: string) => {
    const {data} = await apiClient.get(`/bus/${busId}`);
    return data || {};   

}

export const fetchUserTickets = async () => {
    try {
        const { data } = await apiClient.get('/ticket/my-tickets');
        return data.tickets;
    } catch (error) {
        console.error('Error fetching tickets:', error.response?.data || error.message); // Debugging
        throw error;
    }
}

export const bookTicket = async ({
    busId,
    date,
    seatNumbers,
}: {
    busId: string,
    date: string,
    seatNumbers: string[];
}) => {
    try {
        const { data } = await apiClient.post('/ticket/book', {
            busId,
            date,
            seatNumbers,
        });
        return data?.data || {};
    } catch (error) {
        console.error('Error in bookTicket API:', error.response?.data || error.message); // Log the error response
        throw error;
    }
};