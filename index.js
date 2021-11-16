function ArrayChallenge(arr){
	let i, currSum, sumOfArr = 0;
    let n = arr.length;
	
	for(let i = 0; i < arr.length; i++){
		sumOfArr += arr[i];
	}

    if (sumOfArr & 1){
		document.write( "-1");
		return;
	}

	let k = sumOfArr >> 1;

	let dp = Array.from(Array(n+1), () => Array(k+1));

	for (let i = 1; i <= k; i++){
		dp[0][i] = false;
    }

	for (let i = 0; i <= n; i++){
		dp[i][0] = true;
    }
    
    for (let i = 1; i <= n; i++){
		for (currSum = 1; currSum <= k; currSum++){

			dp[i][currSum] = dp[i - 1][currSum];

			if (arr[i - 1] <= currSum)
				dp[i][currSum] = dp[i][currSum] |
				dp[i - 1][currSum - arr[i - 1]];
		}
	}

	let firstSubset = [], secondSubset = [];

	if(!dp[n][k]){
		document.write( "-1<br>");
		return;
	}

    i = n;
	currSum = k;

	while (i > 0 && currSum >= 0) {
		if(dp[i - 1][currSum]){
			i--;
			secondSubset.push(arr[i]);
		}
        else if(dp[i - 1][currSum - arr[i - 1]]){
			i--;
			currSum -= arr[i];
			firstSubset.push(arr[i]);
		}
	}
    let sorter = (a,b) => a-b;

    firstSubset.sort(sorter);
    secondSubset.sort(sorter);

    let finalArr = [];

    if(firstSubset[0]<secondSubset[0]) finalArr = [...firstSubset, ...secondSubset];
    
    else finalArr =[...secondSubset, ...firstSubset];

    document.write("Final array:");
    for (i = 0; i < finalArr.length; i++){
       document.write(finalArr[i] + " ");
    }
}

let submit = document.getElementById("submit");

submit.addEventListener("click", function(){
    let arr = document.getElementById("numbers")
                      .value
                      .split(" ")
                      .map(Number);

    ArrayChallenge(arr);
});




