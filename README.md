
# Bank Loan Status Prediction

Bank Loan Recovery has been a major issue in the last decade. Famous names (not to be named) have stolen billions of dollors and decieved authorities. I have built a prediction model that would predict if a customer will return the loan based on selected factors.

### The project is divided into 2 parts:
1. Exploratory data analysis 
2. Prediction using machine learning

![](https://github.com/shauryat1298/Bank-Loan-Status/blob/main/images/loan.png?raw=true)





## Dataset used:
I have used bank loan status dataset from Kaggle. The basic analysis of the data showed ~100,000 rows and 16 independent features. Here's a brief of the data:

![](https://github.com/shauryat1298/Bank-Loan-Status/blob/main/images/data_info.PNG?raw=true)

### Correlation Matrix

![](https://github.com/shauryat1298/Bank-Loan-Status/blob/main/images/corr.png?raw=true)


## Exploratory Data Analysis

First I found out the imbalance in data.

1. It was concluded that Fully Paid comprises 74.8% of the customers
2. 25.2% customers were charged off of the loan

#### Loan Status v/s Years in Current Job
![](https://github.com/shauryat1298/Bank-Loan-Status/blob/main/images/loan_statusvsyincj.png?raw=true)

#### Distribution plot of "Purpose of taking Loan"
![](https://github.com/shauryat1298/Bank-Loan-Status/blob/main/images/PurposeOfTakingLoan.png?raw=true)

#### Home Ownership in coexistance with the Loan Status
![](https://github.com/shauryat1298/Bank-Loan-Status/blob/main/images/HomeOwnership.png?raw=true)

#### Pairplots of all pairs
![](https://github.com/shauryat1298/Bank-Loan-Status/blob/main/images/pairplot.png?raw=true)


## Machine Learning model & Results

I have used and experimented with 5 different algorithms. They are the following:

1. Logistic Regression
2. K-Nearest Neighbours
3. Decision Tree
4. Random Forest
5. XG Boost


The results are the following:

![](https://github.com/shauryat1298/Bank-Loan-Status/blob/main/images/results.PNG?raw=true)

I used hyperparameter tuning techniques to optimise the models. After all the testing phase, I found Decision Tree, Random Forest and XG Boost Classifier to be the best performing models, with the XG Boost classifier slightly outperforming.

The precision value is close to 0.73, which shows the 73 out of 100 times we are correctly predicting the defaulters