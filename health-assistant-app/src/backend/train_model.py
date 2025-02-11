import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.utils import resample
from sklearn.preprocessing import LabelEncoder

# Load Dataset
df = pd.read_csv("dataset.csv")

# Ensure column names are formatted correctly
df.columns = df.columns.str.replace(" ", "_")

# Check for data imbalance
print("🔍 Class Distribution Before Duplication:\n", df["Diagnosis"].value_counts())

# Balance the dataset by duplicating rare cases
df_balanced = pd.DataFrame()
for diagnosis in df["Diagnosis"].unique():
    subset = df[df["Diagnosis"] == diagnosis]
    df_balanced = pd.concat([df_balanced, resample(subset, replace=True, n_samples=20, random_state=42)])

print("🔍 Class Distribution After Duplication:\n", df_balanced["Diagnosis"].value_counts())

# Separate Features & Labels
X = df_balanced.drop(columns=["Diagnosis"])
y = df_balanced["Diagnosis"]

# Encode Labels
encoder = LabelEncoder()
y = encoder.fit_transform(y)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Train Model (Increase Complexity)
model = RandomForestClassifier(n_estimators=300, max_depth=10, random_state=42)
model.fit(X_train, y_train)

# Evaluate Model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"🎯 Model Accuracy: {accuracy:.2f}")

# Save Model & Encoder
joblib.dump(model, "diagnosis_model.pkl")
joblib.dump(encoder, "label_encoder.pkl")

print("Model training complete!")
