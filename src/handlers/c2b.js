const payBiz = (req, res) => {
    const access_token = req.cookies.access_token

    // const { ShortCode, CommandID, } = req.body

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "incap_ses_1043_2742146=7MWMdKdNgkOM/HiG1nt5Dn5yHGQAAAAAKqA4eCfiyh+CtND4Z8lkvw==; visid_incap_2742146=WGzRj+bhRj+DtngTUWtPY35yHGQAAAAAQUIPAAAAAAAfi90PBA9UlYJFNcbIQV+i");

    var raw = JSON.stringify({
        "ShortCode": "123456",
        "CommandID": "CustomerPayBillOnline",
        "Amount": "100",
        "Msisdn": "254757478812",
        "BillRefNumber": "fajsdlfkj234233"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate", requestOptions)
        .then(response => response.json())
        .then(result => res.send(result))
        .catch(error => console.log('error', error));

}

module.exports = {
    payBiz
}