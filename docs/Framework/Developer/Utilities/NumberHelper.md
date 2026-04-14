# Number Helper

This utility provides a simple interface for parsing numeric types from strings. It is particularly useful when handling command arguments that may represent different numeric types.

[[toc]]

## Parsing Numbers

The `NumberHelper.Parse<T>` method provides a generic way to parse strings into numeric types. It supports `int`, `long`, `float`, `double`, and `decimal`.

```csharp
// Parse as int
int count = NumberHelper.Parse<int>("42");

// Parse as float
float distance = NumberHelper.Parse<float>("3.14");

// Parse as double
double precision = NumberHelper.Parse<double>("2.718281828");

// Parse as decimal
decimal currency = NumberHelper.Parse<decimal>("99.99");
```

## Supported Types

| Type      | Example Input | Description                          |
|-----------|---------------|--------------------------------------|
| `int`     | `"42"`        | 32-bit signed integer                |
| `long`    | `"9999999999"`| 64-bit signed integer                |
| `float`   | `"3.14"`      | Single-precision floating point      |
| `double`  | `"3.14159"`   | Double-precision floating point      |
| `decimal` | `"99.99"`     | High-precision decimal               |
